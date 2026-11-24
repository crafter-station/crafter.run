import type { Locale } from "@/lib/i18n";

export type LinkedInShareLabels = {
	open: string;
	title: string;
	hint: string;
	visibility: string;
	public: string;
	connections: string;
	publish: string;
	publishing: string;
	cancel: string;
	close: string;
	done: string;
	view: string;
	signIn: string;
	signInHint: string;
	connect: string;
	connectHint: string;
	reconnect: string;
	errors: Record<
		"generic" | "rate_limited" | "image_unavailable" | "image_too_large",
		string
	>;
};

export const linkedInShareCopy: Record<Locale, LinkedInShareLabels> = {
	en: {
		open: "Post on LinkedIn",
		title: "Post on LinkedIn",
		hint: "Edit the text before posting. Nothing is posted until you press Post.",
		visibility: "Who can see it",
		public: "Anyone",
		connections: "Connections only",
		publish: "Post",
		publishing: "Posting…",
		cancel: "Cancel",
		close: "Close",
		done: "Posted on LinkedIn.",
		view: "View the post",
		signIn: "Sign in to post",
		signInHint: "Sign in to crafter.run to post on LinkedIn from here.",
		connect: "Connect LinkedIn",
		connectHint:
			"Connect your LinkedIn account once. crafter.run only posts when you press Post.",
		reconnect: "Allow posting on LinkedIn",
		errors: {
			generic: "LinkedIn did not accept the post. Try again in a moment.",
			rate_limited:
				"LinkedIn limits how many posts you can make per day. Try again tomorrow.",
			image_unavailable: "The image could not be loaded. Try again.",
			image_too_large: "The image is too large for LinkedIn.",
		},
	},
	es: {
		open: "Publicar en LinkedIn",
		title: "Publicar en LinkedIn",
		hint: "Edita el texto antes de publicar. No se publica nada hasta que aprietes Publicar.",
		visibility: "Quién puede verlo",
		public: "Cualquiera",
		connections: "Solo conexiones",
		publish: "Publicar",
		publishing: "Publicando…",
		cancel: "Cancelar",
		close: "Cerrar",
		done: "Publicado en LinkedIn.",
		view: "Ver la publicación",
		signIn: "Inicia sesión para publicar",
		signInHint:
			"Inicia sesión en crafter.run para publicar en LinkedIn desde aquí.",
		connect: "Conectar LinkedIn",
		connectHint:
			"Conecta tu cuenta de LinkedIn una vez. crafter.run solo publica cuando aprietas Publicar.",
		reconnect: "Permitir publicar en LinkedIn",
		errors: {
			generic:
				"LinkedIn no aceptó la publicación. Intenta de nuevo en un momento.",
			rate_limited:
				"LinkedIn limita cuántas publicaciones puedes hacer por día. Intenta mañana.",
			image_unavailable: "No se pudo cargar la imagen. Intenta de nuevo.",
			image_too_large: "La imagen es demasiado grande para LinkedIn.",
		},
	},
	pt: {
		open: "Publicar no LinkedIn",
		title: "Publicar no LinkedIn",
		hint: "Edite o texto antes de publicar. Nada é publicado até você apertar Publicar.",
		visibility: "Quem pode ver",
		public: "Qualquer pessoa",
		connections: "Só conexões",
		publish: "Publicar",
		publishing: "Publicando…",
		cancel: "Cancelar",
		close: "Fechar",
		done: "Publicado no LinkedIn.",
		view: "Ver a publicação",
		signIn: "Entre para publicar",
		signInHint: "Entre no crafter.run para publicar no LinkedIn daqui.",
		connect: "Conectar LinkedIn",
		connectHint:
			"Conecte sua conta do LinkedIn uma vez. O crafter.run só publica quando você aperta Publicar.",
		reconnect: "Permitir publicar no LinkedIn",
		errors: {
			generic:
				"O LinkedIn não aceitou a publicação. Tente de novo em instantes.",
			rate_limited:
				"O LinkedIn limita quantas publicações você pode fazer por dia. Tente amanhã.",
			image_unavailable: "Não foi possível carregar a imagem. Tente de novo.",
			image_too_large: "A imagem é grande demais para o LinkedIn.",
		},
	},
	zh: {
		open: "发布到 LinkedIn",
		title: "发布到 LinkedIn",
		hint: "发布前可以编辑文字。只有点击“发布”后才会发布。",
		visibility: "谁可以看到",
		public: "所有人",
		connections: "仅限人脉",
		publish: "发布",
		publishing: "发布中…",
		cancel: "取消",
		close: "关闭",
		done: "已发布到 LinkedIn。",
		view: "查看帖子",
		signIn: "登录后发布",
		signInHint: "登录 crafter.run 后即可在这里发布到 LinkedIn。",
		connect: "连接 LinkedIn",
		connectHint:
			"只需连接一次 LinkedIn 账号。只有你点击“发布”时 crafter.run 才会发布。",
		reconnect: "允许发布到 LinkedIn",
		errors: {
			generic: "LinkedIn 未接受这条帖子，请稍后再试。",
			rate_limited: "LinkedIn 限制了每日发帖数量，请明天再试。",
			image_unavailable: "无法加载图片，请重试。",
			image_too_large: "图片太大，LinkedIn 无法接受。",
		},
	},
	ja: {
		open: "LinkedInに投稿",
		title: "LinkedInに投稿",
		hint: "投稿前にテキストを編集できます。「投稿」を押すまで何も投稿されません。",
		visibility: "公開範囲",
		public: "全員",
		connections: "つながりのみ",
		publish: "投稿",
		publishing: "投稿中…",
		cancel: "キャンセル",
		close: "閉じる",
		done: "LinkedInに投稿しました。",
		view: "投稿を見る",
		signIn: "ログインして投稿",
		signInHint: "crafter.runにログインすると、ここからLinkedInに投稿できます。",
		connect: "LinkedInを連携",
		connectHint:
			"LinkedInアカウントの連携は一度だけ。crafter.runが投稿するのは「投稿」を押したときだけです。",
		reconnect: "LinkedInへの投稿を許可",
		errors: {
			generic:
				"LinkedInが投稿を受け付けませんでした。少し待ってからもう一度お試しください。",
			rate_limited:
				"LinkedInの1日あたりの投稿数の上限に達しました。明日もう一度お試しください。",
			image_unavailable: "画像を読み込めませんでした。もう一度お試しください。",
			image_too_large: "画像がLinkedInには大きすぎます。",
		},
	},
};
