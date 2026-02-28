import {PageHeader} from '@/components/common/PageHeader';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent} from '@/components/ui/card';
import {toast} from 'sonner';
import {AdminLayout} from "@/features/admin/components/layout/AdminLayout.tsx";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useTeacherMutation} from "@/features/admin/pages/teachers";
import {ToastHelper} from "@/features/api/errorHandler.ts";
import {AxiosError} from "axios";
import {UserRegisterRequest} from "@/features";

interface TeacherRegisterViewProps {
    onBack: () => void;
}

const schema = yup.object().shape({
    email: yup
        .string()
        .required('Email kiritilishi shart')
        .email('To\'g\'ri email formatini kiriting'),
    password: yup
        .string()
        .required('Parol kiritilishi shart')
        .min(6, 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak'),
    fullName: yup
        .string()
        .required('To\'liq ism kiritilishi shart')
        .min(3, 'To\'liq ism kamida 3 ta belgidan iborat bo\'lishi kerak'),
    role: yup.string().required('Rolni tanlang')
});

export function TeacherRegisterView({onBack}: TeacherRegisterViewProps) {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm<UserRegisterRequest>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
            fullName: '',
        }
    });

    const {mutation: {registerTeacher}} = useTeacherMutation();

    const onSubmit = async (data: UserRegisterRequest) => {
        // Ensure role is TEACHER
        const teacherData = {...data, role: 'teacher'};

        await registerTeacher.mutateAsync(teacherData, {
            onSuccess: () => {
                toast.success('O\'qituvchi muvaffaqiyatli yaratildi');
                onBack();
            },
            onError: (error: AxiosError) => ToastHelper(error)
        });
    };

    return (
        <AdminLayout>
            <PageHeader
                title="O'qituvchi yaratish"
                description="Yangi o'qituvchini qo'shish"
            />

            <Card className="max-w-2xl shadow-card">
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register('email')}
                                placeholder="Email manzilini kiriting"
                                className={errors.email ? 'border-destructive' : ''}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Parol *</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register('password')}
                                placeholder="Parolni kiriting"
                                className={errors.password ? 'border-destructive' : ''}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fullName">To'liq ism *</Label>
                            <Input
                                id="fullName"
                                {...register('fullName')}
                                placeholder="To'liq ismni kiriting"
                                className={errors.fullName ? 'border-destructive' : ''}
                            />
                            {errors.fullName && (
                                <p className="text-sm text-destructive">{errors.fullName.message}</p>
                            )}
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Yuklanmoqda...' : 'O\'qituvchi yaratish'}
                            </Button>
                            <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
                                Bekor qilish
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
