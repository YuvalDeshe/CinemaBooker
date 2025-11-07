import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/app/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    
    const showroomId = params.id;

    if (!showroomId) {
      return NextResponse.json(
        { message: 'Showroom ID is required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB and find the showroom
    const mongoose = require('mongoose');
    const db = mongoose.connection.db;
    
    const showroom = await db.collection('ShowRoomDatabase').findOne({
      _id: new ObjectId(showroomId)
    });

    if (!showroom) {
      return NextResponse.json(
        { message: 'Showroom not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(showroom);

  } catch (error) {
    console.error('Error fetching showroom:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}