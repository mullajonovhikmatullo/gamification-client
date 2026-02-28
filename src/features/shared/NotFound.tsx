import { Link } from 'react-router-dom';
import { Button } from '@/features/student/components/ui/button.tsx';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="text-center space-y-6 max-w-md">
                <h1 className="text-9xl font-bold text-primary">404</h1>
                <div className="space-y-2">
                    <h2 className="text-3xl font-semibold">Page Not Found</h2>
                    <p className="text-muted-foreground">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>
                <Button asChild variant="game" size="lg">
                    <Link to="/dashboard">
                        <Home className="mr-2 h-5 w-5" />
                        Go Home
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default NotFoundPage;