import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useState, useRef, FormEvent, CSSProperties } from 'react';
import { clsx } from 'clsx';
import {
	fontFamilyOptions,
	ArticleStateType,
	defaultArticleState,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';

export type ArticleParamsFormProps = {
	pageState: ArticleStateType;
	onApplyState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	pageState,
	onApplyState,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState<ArticleStateType>(pageState);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		onChange: setIsMenuOpen,
		rootRef: sidebarRef,
	});

	const handleChange =
		<K extends keyof ArticleStateType>(field: K) =>
		(value: ArticleStateType[K]) => {
			setFormState((prev) => ({ ...prev, [field]: value }));
		};

	const handleReset = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		onApplyState(defaultArticleState);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApplyState(formState);
		setIsMenuOpen(false);
	};

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen((open) => !open)}
			/>
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
				style={
					{
						'--font-family': formState.fontFamilyOption.value,
						'--font-size': formState.fontSizeOption.value,
						'--font-color': formState.fontColor.value,
						'--container-width': formState.contentWidth.value,
						'--bg-color': formState.backgroundColor.value,
					} as CSSProperties
				}>
				<form
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleSubmit}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={handleChange('fontFamilyOption')}></Select>
					<RadioGroup
						title='Размер шрифта'
						name='fontSizeOptions'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleChange('fontSizeOption')}></RadioGroup>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleChange('fontColor')}></Select>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleChange('backgroundColor')}></Select>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleChange('contentWidth')}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
