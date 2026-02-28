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
import {AdminLayout} from "@/features/admin/components/layout/AdminLayout.tsx";
import {useForm, Controller, useFieldArray, useWatch} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useQuizMutation} from "@/features/admin/pages/quizzes";
import {useCategoriesAdmin} from "@/features/admin/pages/categories";
import {ToastHelper} from "@/features/api/errorHandler.ts";
import {AxiosError} from "axios";
import {QuizCreateRequest} from "@/features";
import {Info} from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {useState, useEffect} from 'react';

interface QuizRegisterViewProps {
    onBack: () => void;
}

const schema = yup.object().shape({
    categoryId: yup
        .string()
        .required('Kategoriya tanlanishi shart'),
    title: yup
        .string()
        .required('Nomi kiritilishi shart')
        .min(3, 'Nomi kamida 3 ta belgidan iborat bo\'lishi kerak'),
    description: yup
        .string(),
    quizCount: yup
        .number()
        .required('Savollar soni kiritilishi shart')
        .min(1, 'Kamida 1 ta savol bo\'lishi kerak'),
    quizTime: yup
        .string()
        .required('Test vaqti kiritilishi shart'),
    maxBall: yup
        .number()
        .required('Maksimal ball kiritilishi shart')
        .min(1, 'Kamida 1 ball bo\'lishi kerak'),
    rule: yup
        .array()
        .of(
            yup.object().shape({
                minPercent: yup
                    .number(),
                maxPercent: yup
                    .number(),
                score: yup
                    .number(),
                badge: yup.string().optional(),
                stars: yup
                    .number(),
            })
        )
        .required('Qoidalar kiritilishi shart')
});

export function QuizRegisterView({onBack}: QuizRegisterViewProps) {
    const [showTooltip, setShowTooltip] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: {errors, isSubmitting}
    } = useForm<QuizCreateRequest>({
        resolver: yupResolver(schema),
        defaultValues: {
            categoryId: '',
            title: '',
            description: '',
            quizCount: 10,
            quizTime: '10:00',
            maxBall: 30,
            rule: [
                {minPercent: 0, maxPercent: 50, score: -50, badge: '', stars: 0},
                {minPercent: 51, maxPercent: 75, score: 50, badge: '', stars: 1},
                {minPercent: 76, maxPercent: 99, score: 70, badge: '', stars: 2},
                {minPercent: 100, maxPercent: 100, score: 100, badge: '', stars: 3}
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

    const {mutation: {createQuiz}} = useQuizMutation();
    const {categories, categoriesAreLoading} = useCategoriesAdmin();

    const onSubmit = async (data: QuizCreateRequest) => {
        // Set fixed values
        const submitData = {...data, maxStars: 3, order: 0};
        console.log(submitData);
        await createQuiz.mutateAsync(submitData, {
            onSuccess: () => {
                toast.success('Test muvaffaqiyatli yaratildi');
                onBack();
            },
            onError: (error: AxiosError) => ToastHelper(error)
        });
    };

    return (
        <AdminLayout>
            <PageHeader
                title="Test yaratish"
            />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left side - Main Information */}
                    <Card className="shadow-card">
                        <CardContent className="pt-6 space-y-6">
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
                                                <SelectValue
                                                    placeholder={categoriesAreLoading ? "Yuklanmoqda..." : "Kategoriyani tanlang"}/>
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
                                <Label htmlFor="title">Nomi *</Label>
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
                                <Label htmlFor="description">Tavsif *</Label>
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
                                    <Label htmlFor="quizCount">Savollar soni *</Label>
                                    <Input
                                        id="quizCount"
                                        type="number"
                                        {...register('quizCount', {valueAsNumber: true})}
                                        placeholder="10"
                                        className={errors.quizCount ? 'border-destructive' : ''}
                                    />
                                    {errors.quizCount && (
                                        <p className="text-sm text-destructive">{errors.quizCount.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="quizTime">Test vaqti (mm:ss) *</Label>
                                    <Input
                                        id="quizTime"
                                        {...register('quizTime')}
                                        placeholder="00:10:00"
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
                                    placeholder="100"
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
                                                <Info
                                                    className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"/>
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent
                                            className="bg-white text-black border border-gray-200 shadow-lg max-w-sm">
                                            <p className="text-sm">
                                                Qoidalar testdan olingan natijaga qarab, talabaga beriladigan ball va
                                                yulduzlarni belgilaydi.
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
                        {isSubmitting ? 'Yuklanmoqda...' : 'Test yaratish'}
                    </Button>
                    <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
                        Bekor qilish
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
