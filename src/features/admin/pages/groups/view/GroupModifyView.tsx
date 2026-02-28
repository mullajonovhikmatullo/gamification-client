import {useEffect} from 'react';
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
import {toast} from 'sonner';
import {Loader2} from 'lucide-react';
import {AdminLayout} from "@/features/admin/components/layout/AdminLayout.tsx";
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useGroupAdmin, useGroupMutation} from "@/features/admin/pages/groups";
import {ToastHelper} from "@/features/api/errorHandler.ts";
import {AxiosError} from "axios";
import {GroupModifyRequest} from "@/features";
import {useTeachersAdmin} from "@/features/admin/pages/teachers";

interface GroupModifyViewProps {
    onList: () => void;
    groupId: string;
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

export function GroupModifyView({onList, groupId}: GroupModifyViewProps) {
    const {group, groupIsLoading} = useGroupAdmin(groupId);
    const {teachers, teachersAreLoading} = useTeachersAdmin();
    const {mutation: {modifyGroup}} = useGroupMutation();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: {errors, isSubmitting}
    } = useForm<GroupModifyRequest>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            teacherId: ''
        }
    });

    // Reset form when group data is loaded
    useEffect(() => {
        if (group) {
            reset({
                name: group.name || '',
                teacherId: typeof group.teacherId === 'string' ? group.teacherId : group.teacherId?._id || ''
            });
        }
    }, [group, reset]);

    const onSubmit = async (data: GroupModifyRequest) => {
        await modifyGroup.mutateAsync(
            {params: data, id: groupId},
            {
                onSuccess: () => {
                    toast.success('Guruh muvaffaqiyatli yangilandi');
                    onList();
                },
                onError: (error: AxiosError) => ToastHelper(error)
            }
        );
    };

    if (groupIsLoading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground"/>
                </div>
            </AdminLayout>
        );
    }

    if (!group) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <p className="text-muted-foreground">Guruh topilmadi</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <PageHeader
                title="Guruhni tahrirlash"
                description="Guruh ma'lumotlarini yangilash"
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
                                {isSubmitting ? 'Yuklanmoqda...' : 'Guruhni yangilash'}
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
