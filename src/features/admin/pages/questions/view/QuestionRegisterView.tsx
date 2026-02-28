import {PageHeader} from '@/components/common/PageHeader';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import {Checkbox} from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {toast} from 'sonner';
import {AdminLayout} from "@/features/admin/components/layout/AdminLayout.tsx";
import {useForm, useFieldArray, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useQuestionMutation} from "@/features/admin/pages/questions";
import {useCategoriesAdmin} from "@/features/admin/pages/categories";
import {ToastHelper} from "@/features/api/errorHandler.ts";
import {AxiosError} from "axios";
import {QuestionCreateRequest} from "@/features";
import {Plus, Trash2} from 'lucide-react';

interface QuestionRegisterViewProps {
    onBack: () => void;
}

const schema = yup.object().shape({
    categoryId: yup
        .string()
        .required('Kategoriya tanlanishi shart'),
    question: yup
        .string()
        .required('Savol kiritilishi shart')
        .min(5, 'Savol kamida 5 ta belgidan iborat bo\'lishi kerak'),
    choices: yup
        .array()
        .of(
            yup.object().shape({
                text: yup.string().required('Javob matni kiritilishi shart'),
                isCorrect: yup.boolean()
            })
        )
        .min(2, 'Kamida 2 ta javob bo\'lishi kerak')
        .required()
});

export function QuestionRegisterView({onBack}: QuestionRegisterViewProps) {
    const {categories, categoriesAreLoading} = useCategoriesAdmin();

    const {
        register,
        handleSubmit,
        control,
        formState: {errors, isSubmitting}
    } = useForm<QuestionCreateRequest>({
        resolver: yupResolver(schema),
        defaultValues: {
            categoryId: '',
            question: '',
            choices: [
                {text: '', isCorrect: false},
                {text: '', isCorrect: false}
            ]
        }
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: 'choices'
    });

    const {mutation: {createQuestion}} = useQuestionMutation();

    const onSubmit = async (data: QuestionCreateRequest) => {
        await createQuestion.mutateAsync(data, {
            onSuccess: () => {
                toast.success('Savol muvaffaqiyatli yaratildi');
                onBack();
            },
            onError: (error: AxiosError) => ToastHelper(error)
        });
    };

    return (
        <AdminLayout>
            <PageHeader
                title="Savol yaratish"
                description="Yangi savolni qo'shish"
            />

            <Card className="max-w-2xl shadow-card">
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="categoryId">Kategoriya *</Label>
                            <Controller
                                name="categoryId"
                                control={control}
                                render={({field}) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        disabled={categoriesAreLoading}
                                    >
                                        <SelectTrigger className={errors.categoryId ? 'border-destructive' : ''}>
                                            <SelectValue placeholder={categoriesAreLoading ? "Yuklanmoqda..." : "Kategoriyani tanlang"}/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories?.map((category) => (
                                                <SelectItem key={category._id} value={category._id}>
                                                    {category.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.categoryId && (
                                <p className="text-sm text-destructive">{errors.categoryId.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="question">Savol *</Label>
                            <Textarea
                                id="question"
                                {...register('question')}
                                placeholder="Savolni kiriting"
                                className={errors.question ? 'border-destructive' : ''}
                            />
                            {errors.question && (
                                <p className="text-sm text-destructive">{errors.question.message}</p>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Javoblar *</Label>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => append({text: '', isCorrect: false})}
                                >
                                    <Plus className="h-4 w-4 mr-2"/>
                                    Javob qo'shish
                                </Button>
                            </div>

                            {fields.map((field, index) => (
                                <div key={field.id} className="flex gap-2 items-start p-4 border rounded-lg">
                                    <div className="flex-1 space-y-2">
                                        <Input
                                            {...register(`choices.${index}.text` as const)}
                                            placeholder={`${index + 1}-javob`}
                                            className={errors.choices?.[index]?.text ? 'border-destructive' : ''}
                                        />
                                        {errors.choices?.[index]?.text && (
                                            <p className="text-sm text-destructive">{errors.choices[index].text.message}</p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 pt-2">
                                        <Controller
                                            name={`choices.${index}.isCorrect` as const}
                                            control={control}
                                            render={({field}) => (
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            )}
                                        />
                                        <Label className="text-sm">To'g'ri</Label>
                                    </div>
                                    {fields.length > 2 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => remove(index)}
                                            className="text-destructive"
                                        >
                                            <Trash2 className="h-4 w-4"/>
                                        </Button>
                                    )}
                                </div>
                            ))}
                            {errors.choices && typeof errors.choices.message === 'string' && (
                                <p className="text-sm text-destructive">{errors.choices.message}</p>
                            )}
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Yuklanmoqda...' : 'Savol yaratish'}
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
