import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

// Input validation schema
const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
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

    // Update user profile with name
    await updateProfile(userCredential.user, {
      displayName: validatedData.name
    });

    // Return success response
    return NextResponse.json(
      {
        message: 'Account created successfully',
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: validatedData.name,
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

    // Handle Firebase specific errors
    if (error.code === 'auth/email-already-in-use') {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
} 