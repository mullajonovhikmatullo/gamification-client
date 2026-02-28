import {PageHeader} from '@/components/common/PageHeader';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {Switch} from '@/components/ui/switch';
import {toast} from 'sonner';
import {AdminLayout} from "@/features/admin/components/layout/AdminLayout.tsx";
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useGroupMutation} from "@/features/admin/pages/groups";
import {ToastHelper} from "@/features/api/errorHandler.ts";
import {AxiosError} from "axios";
import {GroupRegisterRequest} from "@/features";
import {useTeachersAdmin} from "@/features/admin/pages/teachers";

interface GroupRegisterViewProps {
    onBack: () => void;
}

const schema = yup.object().shape({
    name: yup
        .string()
        .required('Nomi kiritilishi shart')
        .min(3, 'Nomi kamida 3 ta belgidan iborat bo\'lishi kerak')
        .max(100, 'Nomi 100 ta belgidan oshmasligi kerak'),
    teacherId: yup
        .string()
        .required('O\'qituvchi tanlanishi shart')
});

export function GroupRegisterView({onBack}: GroupRegisterViewProps) {
    //
    const { teachers, teachersAreLoading } = useTeachersAdmin();
    const {
        register,
        handleSubmit,
        control,
        formState: {errors, isSubmitting}
    } = useForm<GroupRegisterRequest>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            teacherId: ''
        }
    });

    const {mutation: {createGroup}} = useGroupMutation();

    const onSubmit = async (data: GroupRegisterRequest) => {
        await createGroup.mutateAsync(data, {
            onSuccess: () => {
                toast.success('Guruh muvaffaqiyatli yaratildi');
                onBack();
            },
            onError: (error: AxiosError) => ToastHelper(error)
        });
    };

    return (
        <AdminLayout>
            <PageHeader
                title="Guruh yaratish"
                description="Yangi o'quv guruhini qo'shish"
            />

            <Card className="max-w-2xl shadow-card">
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nomi *</Label>
                            <Input
                                id="name"
                                {...register('name')}
                                placeholder="Guruh nomini kiriting"
                                className={errors.name ? 'border-destructive' : ''}
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="teacherId">O'qituvchi *</Label>
                            <Controller
                                name="teacherId"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        disabled={teachersAreLoading}
                                    >
                                        <SelectTrigger className={errors.teacherId ? 'border-destructive' : ''}>
                                            <SelectValue placeholder="O'qituvchini tanlang" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {teachers?.map((teacher) => (
                                                <SelectItem key={teacher._id} value={teacher._id}>
                                                    {teacher.fullName} ({teacher.email})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.teacherId && (
                                <p className="text-sm text-destructive">{errors.teacherId.message}</p>
                            )}
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Yuklanmoqda...' : 'Guruh yaratish'}
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
