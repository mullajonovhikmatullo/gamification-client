import {useEffect} from 'react';
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
import {Loader2, Plus, Trash2} from 'lucide-react';
import {AdminLayout} from "@/features/admin/components/layout/AdminLayout.tsx";
import {useForm, useFieldArray, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useQuestionAdmin, useQuestionMutation} from "@/features/admin/pages/questions";
import {useCategoriesAdmin} from "@/features/admin/pages/categories";
import {ToastHelper} from "@/features/api/errorHandler.ts";
import {AxiosError} from "axios";
import {QuestionModifyRequest} from "@/features";

interface QuestionModifyViewProps {
    onList: () => void;
    questionId: string;
}

const schema = yup.object().shape({
    categoryId: yup.string().optional(),
    question: yup
        .string()
        .min(5, 'Savol kamida 5 ta belgidan iborat bo\'lishi kerak')
        .optional(),
    choices: yup
        .array()
        .of(
            yup.object().shape({
                text: yup.string().required('Javob matni kiritilishi shart'),
                isCorrect: yup.boolean()
            })
        )
        .min(2, 'Kamida 2 ta javob bo\'lishi kerak')
        .optional()
});

export function QuestionModifyView({onList, questionId}: QuestionModifyViewProps) {
    const {question, questionIsLoading} = useQuestionAdmin(questionId);
    const {mutation: {modifyQuestion}} = useQuestionMutation();
    const {categories, categoriesAreLoading} = useCategoriesAdmin();

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: {errors, isSubmitting}
    } = useForm<QuestionModifyRequest>({
        resolver: yupResolver(schema),
        defaultValues: {
            categoryId: '',
            question: '',
            choices: []
        }
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: 'choices'
    });

    useEffect(() => {
        if (question) {
            reset({
                categoryId: typeof question.categoryId === 'string' ? question.categoryId : question.categoryId?._id || '',
                question: question.question || '',
                choices: question.choices || []
            });
        }
    }, [question, reset]);

    const onSubmit = async (data: QuestionModifyRequest) => {
        await modifyQuestion.mutateAsync(
            {params: data, id: questionId},
            {
                onSuccess: () => {
                    toast.success('Savol muvaffaqiyatli yangilandi');
                    onList();
                },
                onError: (error: AxiosError) => ToastHelper(error)
            }
        );
    };

    if (questionIsLoading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground"/>
                </div>
            </AdminLayout>
        );
    }

    if (!question) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <p className="text-muted-foreground">Savol topilmadi</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <PageHeader
                title="Savolni tahrirlash"
                description="Savol ma'lumotlarini yangilash"
            />

            <Card className="max-w-2xl shadow-card">
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="categoryId">Kategoriya</Label>
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
                            <Label htmlFor="question">Savol</Label>
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
                                <Label>Javoblar</Label>
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
                                {isSubmitting ? 'Yuklanmoqda...' : 'Savolni yangilash'}
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
