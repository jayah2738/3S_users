import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;

        // First find the student to get their username
        const student = await prisma.student.findUnique({
            where: { id },
            select: { username: true }
        });

        if (!student) {
            return NextResponse.json(
                { error: 'Student not found' },
                { status: 404 }
            );
        }

        // Delete the student record
        await prisma.student.delete({
            where: { id }
        });

        // Also delete the associated user record
        await prisma.user.delete({
            where: { username: student.username }
        });

        return NextResponse.json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: 'Failed to delete student' },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await request.json();
        const { isActive } = data;

        if (typeof isActive !== "boolean") {
            return NextResponse.json({ error: "isActive field must be a boolean" }, { status: 400 });
        }

        const updatedStudent = await prisma.student.update({
            where: {
                id: params.id,
            },
            data: {
                isActive,
            },
        });

        return NextResponse.json({ student: updatedStudent });
    } catch (error) {
        console.error("Error updating student:", error);
        return NextResponse.json({ error: "Failed to update student" }, { status: 500 });
    }
} 