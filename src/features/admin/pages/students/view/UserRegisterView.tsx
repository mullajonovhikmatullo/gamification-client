import {PageHeader} from '@/features/admin/components/common/PageHeader';
import {Button} from '@/features/admin/components/ui/button';
import {Input} from '@/features/admin/components/ui/input';
import {Label} from '@/features/admin/components/ui/label';
import {Card, CardContent} from '@/features/admin/components/ui/card';
import {toast} from 'sonner';
import {AdminLayout} from "@/features/admin/components/layout/AdminLayout.tsx";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useUserMutation} from "@/features/admin/pages/students";
import {ToastHelper} from "@/features/api/errorHandler.ts";
import {AxiosError} from "axios";
import {Role} from "@/features";

interface UserRegisterViewProps {
    onBack: () => void;
}

interface UserFormData {
    email: string;
    password: string;
    fullName: string;
    role: Role;
}

const schema = yup.object().shape({
    email: yup
        .string()
        .required('Email kiritilishi shart')
        .email('To\'g\'ri email formatini kiriting'),
    password: yup
        .string()
        .required('Parol kiritilishi shart')
        .min(3, 'Parol kamida 3 ta belgidan iborat bo\'lishi kerak'),
    fullName: yup
        .string()
        .required('To\'liq ism kiritilishi shart')
        .min(3, 'To\'liq ism kamida 3 ta belgidan iborat bo\'lishi kerak'),
    role: yup
        .mixed<Role>()
        .oneOf(Object.values(Role), 'Rol tanlanishi shart')
        .required('Rol kiritilishi shart'),
});

export function UserRegisterView({onBack}: UserRegisterViewProps) {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm<UserFormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
            fullName: '',
            role: Role.STUDENT,
        }
    });

    const {mutation: {registerUser}} = useUserMutation();

    const onSubmit = async (data: UserFormData) => {
        await registerUser.mutateAsync(data, {
            onSuccess: () => {
                toast.success('Foydalanuvchi muvaffaqiyatli yaratildi');
                onBack();
            },
            onError: (error: AxiosError) => ToastHelper(error)
        });
    };

    return (
        <AdminLayout>
            <PageHeader
                title="Foydalanuvchi yaratish"
                description="Yangi foydalanuvchini qo'shish"
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
                                {isSubmitting ? 'Yuklanmoqda...' : 'Foydalanuvchi yaratish'}
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
