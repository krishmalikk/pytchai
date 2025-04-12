import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// Input validation schema
const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    const validatedData = signupSchema.parse(body);

    // Create user with Firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      validatedData.email,
      validatedData.password
    );

    return NextResponse.json(
      {
        message: 'Account created successfully',
        user: {
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    // Handle Firebase errors
    const errorMessage = error.code ? error.code.replace('auth/', '') : 'Failed to create account';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 