import { Article } from 'src/components/article';
import { ArticleParamsForm } from 'src/components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import 'src/styles/index.scss';
import styles from 'src/styles/index.module.scss';
import { CSSProperties, useState } from 'react';

export const App = () => {
	const [pageState, setPageState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': pageState.fontFamilyOption.value,
					'--font-size': pageState.fontSizeOption.value,
					'--font-color': pageState.fontColor.value,
					'--container-width': pageState.contentWidth.value,
					'--bg-color': pageState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm pageState={pageState} onApplyState={setPageState} />
			<Article />
		</main>
	);
};
