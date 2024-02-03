import { 
    NextRequest, 
    NextResponse 
} from 'next/server';
 
export async function POST(req: NextRequest, res: NextResponse) {
    return new Response(null, {
        status: 200
    });
}