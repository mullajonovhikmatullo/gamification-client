import {useEffect, useState} from 'react';
import {PageHeader} from '@/components/common/PageHeader';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {toast} from 'sonner';
import {Loader2, Info} from 'lucide-react';
import {AdminLayout} from "@/features/admin/components/layout/AdminLayout.tsx";
import {useForm, Controller, useFieldArray} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useQuizAdmin, useQuizMutation} from "@/features/admin/pages/quizzes";
import {useCategoriesAdmin} from "@/features/admin/pages/categories";
import {ToastHelper} from "@/features/api/errorHandler.ts";
import {AxiosError} from "axios";
import {QuizModifyRequest} from "@/features";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface QuizModifyViewProps {
    onList: () => void;
    quizId: string;
}

const schema = yup.object().shape({
    categoryId: yup.string().optional(),
    title: yup
        .string()
        .min(3, 'Nomi kamida 3 ta belgidan iborat bo\'lishi kerak')
        .optional(),
    description: yup.string().optional(),
    quizCount: yup
        .number()
        .min(1, 'Kamida 1 ta savol bo\'lishi kerak')
        .optional(),
    quizTime: yup.string().optional(),
    maxBall: yup
        .number()
        .min(1, 'Kamida 1 ball bo\'lishi kerak')
        .optional(),
    rule: yup
        .array()
        .of(
            yup.object().shape({
                minPercent: yup.number().required(),
                maxPercent: yup.number().required(),
                score: yup.number().required(),
                badge: yup.string().required(),
                stars: yup.number().required(),
            })
        )
        .optional()
});

export function QuizModifyView({onList, quizId}: QuizModifyViewProps) {
    //
    const [showTooltip, setShowTooltip] = useState(false);
    const {quiz, quizIsLoading} = useQuizAdmin(quizId);
    const {mutation: {modifyQuiz}} = useQuizMutation();
    const {categories, categoriesAreLoading} = useCategoriesAdmin();

    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        watch,
        formState: {errors, isSubmitting}
    } = useForm<QuizModifyRequest>({
        resolver: yupResolver(schema),
        defaultValues: {
            categoryId: '',
            title: '',
            description: '',
            quizCount: 10,
            quizTime: '10:00',
            maxBall: 30,
            rule: [
                {minPercent: 0, maxPercent: 50, score: -15, badge: '', stars: 0},
                {minPercent: 51, maxPercent: 75, score: 15, badge: '', stars: 1},
                {minPercent: 76, maxPercent: 99, score: 21, badge: '', stars: 2},
                {minPercent: 100, maxPercent: 100, score: 30, badge: '', stars: 3}
            ]
        }
    });

    const {fields} = useFieldArray({
        control,
        name: 'rule'
    });

    const maxBall = watch('maxBall');

    // Update rule scores and stars based on maxBall changes
    useEffect(() => {
        if (maxBall) {
            // Set scores
            setValue('rule.0.score', Math.round(-maxBall / 2)); // 0-50%: -maxBall / 2
            setValue('rule.1.score', Math.round(maxBall * 0.5)); // 51-75%: 50% of maxBall
            setValue('rule.2.score', Math.round(maxBall * 0.7)); // 76-99%: 70% of maxBall
            setValue('rule.3.score', maxBall); // 100%: full maxBall

            // Set fixed star values
            setValue('rule.0.stars', 0);
            setValue('rule.1.stars', 1);
            setValue('rule.2.stars', 2);
            setValue('rule.3.stars', 3);
        }
    }, [maxBall, setValue]);

    useEffect(() => {
        if (quiz) {
            reset({
                categoryId: typeof quiz.categoryId === 'string' ? quiz.categoryId : quiz.categoryId?._id || '',
                title: quiz.title || '',
                description: quiz.description || '',
                quizCount: quiz.quizCount || 10,
                quizTime: quiz.quizTime || '10:00',
                maxBall: quiz.maxBall || 30,
                rule: quiz.rule || [
                    {minPercent: 0, maxPercent: 50, score: -15, badge: '', stars: 0},
                    {minPercent: 51, maxPercent: 75, score: 15, badge: '', stars: 1},
                    {minPercent: 76, maxPercent: 99, score: 21, badge: '', stars: 2},
                    {minPercent: 100, maxPercent: 100, score: 30, badge: '', stars: 3}
                ]
            });
        }
    }, [quiz, reset]);

    const onSubmit = async (data: QuizModifyRequest) => {
        // Set fixed values
        const submitData = {...data, maxStars: 3, order: quiz?.order || 0, isActive: quiz?.isActive ?? true};
        await modifyQuiz.mutateAsync(
            {params: submitData, id: quizId},
            {
                onSuccess: () => {
                    toast.success('Test muvaffaqiyatli yangilandi');
                    onList();
                },
                onError: (error: AxiosError) => ToastHelper(error)
            }
        );
    };

    if (quizIsLoading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground"/>
                </div>
            </AdminLayout>
        );
    }

    if (!quiz) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <p className="text-muted-foreground">Test topilmadi</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <PageHeader
                title="Testni tahrirlash"
            />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left side - Main Information */}
                    <Card className="shadow-card">
                        <CardContent className="pt-6 space-y-6">
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
                            <Label htmlFor="title">Nomi</Label>
                            <Input
                                id="title"
                                {...register('title')}
                                placeholder="Test nomini kiriting"
                                className={errors.title ? 'border-destructive' : ''}
                            />
                            {errors.title && (
                                <p className="text-sm text-destructive">{errors.title.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Tavsif</Label>
                            <Textarea
                                id="description"
                                {...register('description')}
                                placeholder="Test tavsifini kiriting"
                                className={errors.description ? 'border-destructive' : ''}
                            />
                            {errors.description && (
                                <p className="text-sm text-destructive">{errors.description.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="quizCount">Savollar soni</Label>
                                <Input
                                    id="quizCount"
                                    type="number"
                                    {...register('quizCount', {valueAsNumber: true})}
                                    className={errors.quizCount ? 'border-destructive' : ''}
                                />
                                {errors.quizCount && (
                                    <p className="text-sm text-destructive">{errors.quizCount.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="quizTime">Test vaqti</Label>
                                <Input
                                    id="quizTime"
                                    {...register('quizTime')}
                                    className={errors.quizTime ? 'border-destructive' : ''}
                                />
                                {errors.quizTime && (
                                    <p className="text-sm text-destructive">{errors.quizTime.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="maxBall">Max ball *</Label>
                            <Input
                                id="maxBall"
                                type="number"
                                {...register('maxBall', {valueAsNumber: true})}
                                placeholder="30"
                                className={errors.maxBall ? 'border-destructive' : ''}
                            />
                            {errors.maxBall && (
                                <p className="text-sm text-destructive">{errors.maxBall.message}</p>
                            )}
                        </div>
                        </CardContent>
                    </Card>

                    {/* Right side - Rules */}
                    <Card className="shadow-card">
                        <CardContent className="pt-6 space-y-4">
                            <div className="flex items-center gap-2">
                                <Label>Qoidalar *</Label>
                                <TooltipProvider>
                                    <Tooltip open={showTooltip} onOpenChange={setShowTooltip}>
                                        <TooltipTrigger asChild>
                                            <button
                                                type="button"
                                                className="inline-flex"
                                                onClick={() => setShowTooltip(!showTooltip)}
                                            >
                                                <Info className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"/>
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-white text-black border border-gray-200 shadow-lg max-w-sm">
                                            <p className="text-sm">
                                                Qoidalar testdan olingan natijaga qarab, talabaga beriladigan ball va yulduzlarni belgilaydi.
                                                Foiz oraliqlar avtomatik belgilangan: 0-50%, 51-75%, 76-99%, 100%.
                                                Ballar maxBall qiymatiga qarab avtomatik hisoblanadi.
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>

                            <div className="space-y-3">
                                {/* Labels header */}
                                <div className="grid grid-cols-4 gap-2">
                                    <Label className="text-xs font-medium">Min %</Label>
                                    <Label className="text-xs font-medium">Max %</Label>
                                    <Label className="text-xs font-medium">Ball</Label>
                                    <Label className="text-xs font-medium">Yulduz</Label>
                                </div>

                                {/* Rules list */}
                                <div className="space-y-2">
                                    {fields.map((field, index) => (
                                        <div key={field.id} className="grid grid-cols-4 gap-2">
                                            <div>
                                                <Input
                                                    type="number"
                                                    {...register(`rule.${index}.minPercent`, {valueAsNumber: true})}
                                                    readOnly
                                                    className="bg-muted cursor-not-allowed"
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    type="number"
                                                    {...register(`rule.${index}.maxPercent`, {valueAsNumber: true})}
                                                    readOnly
                                                    className="bg-muted cursor-not-allowed"
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    {...register(`rule.${index}.score`, {valueAsNumber: true})}
                                                    readOnly
                                                    className="bg-muted cursor-not-allowed"
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    type="number"
                                                    {...register(`rule.${index}.stars`, {valueAsNumber: true})}
                                                    readOnly
                                                    className="bg-muted cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {errors.rule && !Array.isArray(errors.rule) && (
                                <p className="text-sm text-destructive">{errors.rule.message}</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="flex gap-3 justify-center">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Yuklanmoqda...' : 'Testni yangilash'}
                    </Button>
                    <Button type="button" variant="outline" onClick={onList} disabled={isSubmitting}>
                        Bekor qilish
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
