import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { error: "Username and password are required" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { username: username.trim() },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const response = NextResponse.json(
            {
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                },
            },
            { status: 200 }
        );

        // Set auth cookie with 1 week expiration
        response.cookies.set({
            name: "auth",
            value: user.id,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
        });

        // Set admin cookie if user is admin
        if (user.role === "ADMIN") {
            response.cookies.set({
                name: "admin",
                value: "true",
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
            });
        }

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 