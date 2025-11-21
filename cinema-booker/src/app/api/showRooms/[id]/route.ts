import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/app/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: showroomId } = await params;

    if (!showroomId) {
      return NextResponse.json(
        { message: 'Showroom ID is required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB directly using the same pattern as other APIs
    const { MongoClient } = require('mongodb');
    const uri = process.env.MONGODB_URI;
    
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('ShowRoomDatabase');
    
    const showroom = await db.collection('ShowRoomCollection').findOne({
      _id: new ObjectId(showroomId)
    });

    await client.close();

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