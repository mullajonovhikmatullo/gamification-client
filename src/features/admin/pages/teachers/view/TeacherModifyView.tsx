import {useEffect} from 'react';
import {PageHeader} from '@/components/common/PageHeader';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent} from '@/components/ui/card';
import {Switch} from '@/components/ui/switch';
import {toast} from 'sonner';
import {Loader2} from 'lucide-react';
import {AdminLayout} from "@/features/admin/components/layout/AdminLayout.tsx";
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useTeacherAdmin, useTeacherMutation} from "@/features/admin/pages/teachers";
import {ToastHelper} from "@/features/api/errorHandler.ts";
import {AxiosError} from "axios";
import {UserModifyRequest} from "@/features";

interface TeacherModifyViewProps {
    onList: () => void;
    teacherId: string;
}

const schema = yup.object().shape({
    email: yup
        .string()
        .email('To\'g\'ri email formatini kiriting')
        .optional(),
    fullName: yup
        .string()
        .min(3, 'To\'liq ism kamida 3 ta belgidan iborat bo\'lishi kerak')
        .optional(),
});

export function TeacherModifyView({onList, teacherId}: TeacherModifyViewProps) {
    const {teacher, teacherIsLoading} = useTeacherAdmin(teacherId);
    const {mutation: {modifyTeacher}} = useTeacherMutation();

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: {errors, isSubmitting}
    } = useForm<UserModifyRequest>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            fullName: '',
        }
    });

    // Reset form when teacher data is loaded
    useEffect(() => {
        if (teacher) {
            reset({
                email: teacher.email || '',
                fullName: teacher.fullName || '',
            });
        }
    }, [teacher, reset]);

    const onSubmit = async (data: UserModifyRequest) => {
        // Remove password if empty
        const submitData = {...data};
        if (!submitData.password) {
            delete submitData.password;
        }

        await modifyTeacher.mutateAsync(
            {params: submitData, id: teacherId},
            {
                onSuccess: () => {
                    toast.success('O\'qituvchi muvaffaqiyatli yangilandi');
                    onList();
                },
                onError: (error: AxiosError) => ToastHelper(error)
            }
        );
    };

    if (teacherIsLoading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground"/>
                </div>
            </AdminLayout>
        );
    }

    if (!teacher) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <p className="text-muted-foreground">O'qituvchi topilmadi</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <PageHeader
                title="O'qituvchini tahrirlash"
                description="O'qituvchi ma'lumotlarini yangilash"
            />

            <Card className="max-w-2xl shadow-card">
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
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
                            <Label htmlFor="fullName">To'liq ism</Label>
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
                                {isSubmitting ? 'Yuklanmoqda...' : 'O\'qituvchini yangilash'}
                            </Button>
                            <Button type="button" variant="outline" onClick={onList} disabled={isSubmitting}>
                                Bekor qilish
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
