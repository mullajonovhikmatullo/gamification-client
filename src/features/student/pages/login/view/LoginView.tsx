import {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";
import {Button} from "@/features/student/components/ui/button.tsx";
import {Input} from "@/features/student/components/ui/input.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/features/student/components/ui/card.tsx";
import {Sparkles, Rocket, Trophy, Zap, Eye, EyeOff} from "lucide-react";
import {useAuthContext} from "@/app/providers/AuthProvider.tsx";
import {useLoginMutation} from "../hooks/useLoginMutation.ts";
import {ToastHelper} from "@/features/api/errorHandler.ts";
import {AxiosError} from "axios";
import {LoginRequest, LoginResponse} from "@/features/api";

const loginSchema = yup.object({
    email: yup
        .string()
        .required("Email talab qilinadi")
        .email("Noto'g'ri email manzil"),
    password: yup
        .string()
        .required("Parol talab qilinadi")
        .min(3, "Parol kamida 3 ta belgidan iborat bo'lishi kerak"),
}).required();

export const LoginView = () => {
    //
    const {login} = useAuthContext();
    const {mutation: {login: loginMutation}} = useLoginMutation();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm<LoginRequest>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: LoginRequest) => {
        await loginMutation.mutateAsync(
            {...data},
            {
                onSuccess: (res: LoginResponse) => {
                    login(res.token);

                    // Redirect based on role
                    const redirectPath = res.user.role === 'admin' ? '/admin'
                        : res.user.role === 'teacher' ? '/teacher'
                        : '/student';

                    // Use navigate instead of window.location to avoid double refresh
                    navigate(redirectPath, { replace: true });
                },
                onError: (error: AxiosError) => {
                    ToastHelper(error);
                },
            }
        );
    }

    return <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"/>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold/10 rounded-full blur-3xl"/>
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-success/5 rounded-full blur-3xl"/>
        </div>

        <div className="w-full max-w-md relative z-10">
            {/* Logo and Title */}
            <div className="text-center mb-8">
                <div
                    className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-primary shadow-glow mb-6 animate-float">
                    <Sparkles className="w-10 h-10 text-primary-foreground"/>
                </div>
                <h1 className="text-4xl font-bold text-gradient mb-2">Webstar</h1>
                <p className="text-muted-foreground text-lg">Game App</p>
            </div>

            {/* Login Card */}
            <Card className="shadow-xl border-0">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl">Xush kelibsiz!</CardTitle>
                    <CardDescription className="text-base">
                        O'quv sarguzashtingizni davom ettirishga tayyormisiz?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="alex@webstar.com"
                                className="bg-secondary/50"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                Parol
                            </label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Parolingizni kiriting"
                                    className="bg-secondary/50 pr-12"
                                    {...register("password")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password.message}</p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            variant="game"
                            size="xl"
                            className="w-full mt-6"
                            disabled={loginMutation.isPending}
                        >
                            <Rocket className="mr-2 h-5 w-5"/>
                            {loginMutation.isPending ? "Yuklanmoqda..." : "O'qishni boshlash"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <a href="#" className="text-sm text-primary hover:underline">
                            Parolingizni unutdingizmi?
                        </a>
                    </div>
                </CardContent>
            </Card>

            {/* Features */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-gold"/>
                    </div>
                    <span className="text-xs text-muted-foreground">Nishonlar yig'ing</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                        <Zap className="w-6 h-6 text-warning"/>
                    </div>
                    <span className="text-xs text-muted-foreground">Darajani oshiring</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-primary"/>
                    </div>
                    <span className="text-xs text-muted-foreground">O'rganing va o'ynang</span>
                </div>
            </div>
        </div>
    </div>

}