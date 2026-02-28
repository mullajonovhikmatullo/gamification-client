import {RouterProvider} from "react-router-dom";
import {AuthProvider} from "./providers/AuthProvider";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "sonner";
import {TooltipProvider} from "@radix-ui/react-tooltip";
import {browserRouter} from "@/app/router";
import {useMemo} from "react";

const queryClient = new QueryClient();

export const App = () => {
    const router = useMemo(() => browserRouter, []);
    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <AuthProvider>
                    <Toaster/>
                    <RouterProvider router={router}/>
                </AuthProvider>
            </TooltipProvider>
        </QueryClientProvider>
    );
};

















