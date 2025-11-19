import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-8xl sm:text-9xl font-bold text-gray-200">
              404
            </h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 -mt-4">
              Page Not Found
            </h2>
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Go Back
            </Button>
            <Button
              onClick={() => navigate(ROUTES.HOME)}
              className="w-full sm:w-auto"
            >
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}