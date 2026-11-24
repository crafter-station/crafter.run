import type { Locale } from "@/lib/i18n";

type Section = { title: string; body: string[] };
type PrivacyCopy = {
	eyebrow: string;
	title: string;
	description: string;
	updated: string;
	sections: Section[];
};

const CONTACT = "railly@crafterstation.com";

const en: PrivacyCopy = {
	eyebrow: "Legal",
	title: "Privacy policy",
	description:
		"What crafter.run collects, why, and how to ask us to delete it.",
	updated: "Last updated: November 24, 2026",
	sections: [
		{
			title: "Who we are",
			body: [
				"crafter.run is the website of Crafter Station, an open source community of builders based in Peru. This policy covers crafter.run and the sign-in apps it uses, including our LinkedIn app.",
			],
		},
		{
			title: "What we collect",
			body: [
				"Account: when you sign in, our authentication provider Clerk gives us your name, email address and profile photo. If you sign in with GitHub or LinkedIn, we receive the basic profile you approve on that screen: name, profile photo and email address.",
				"What you publish: your profile, the projects you ship and any text or images you add. This is public by design.",
				"Events: to confirm you are registered for an event, we match the email on your account against the event's guest list on Luma. If you create an event badge, we store the photo you upload.",
				"Newsletter: if you subscribe, we keep your email address and preferred language.",
				"Analytics: we use Vercel Analytics, which counts page views in aggregate and does not use tracking cookies.",
			],
		},
		{
			title: "How we use it",
			body: [
				"We use this data to sign you in, show your public profile and projects, give you access to events you registered for, send the newsletter you asked for, and understand which pages people use.",
				"We do not sell your data and we do not use it for advertising.",
			],
		},
		{
			title: "LinkedIn",
			body: [
				"If you connect LinkedIn, we only receive the data you approve on LinkedIn's consent screen. We use it to sign you in and to fill in your profile. We never post on LinkedIn on your behalf without an explicit action from you. You can revoke access at any time from your LinkedIn settings.",
			],
		},
		{
			title: "Who processes it",
			body: [
				"We rely on these providers to run the site: Clerk (sign-in), Vercel (hosting, analytics and file storage), Neon (database), Resend (email) and Luma (event registration). Each one processes data only to provide its service to us.",
			],
		},
		{
			title: "How long we keep it",
			body: [
				"We keep your account data while your account exists. Newsletter data stays until you unsubscribe. Event data stays as part of the record of that event.",
			],
		},
		{
			title: "Your choices",
			body: [
				`You can ask us to access, correct or delete your data at any time by writing to ${CONTACT}. You can unsubscribe from the newsletter with the link in any email.`,
			],
		},
		{
			title: "Contact",
			body: [`Questions about this policy: ${CONTACT}.`],
		},
	],
};

const es: PrivacyCopy = {
	eyebrow: "Legal",
	title: "Política de privacidad",
	description:
		"Qué datos recoge crafter.run, para qué los usa y cómo pedirnos que los borremos.",
	updated: "Última actualización: 24 de noviembre de 2026",
	sections: [
		{
			title: "Quiénes somos",
			body: [
				"crafter.run es el sitio de Crafter Station, una comunidad open source de builders con base en Perú. Esta política cubre crafter.run y las apps de inicio de sesión que usa, incluida nuestra app de LinkedIn.",
			],
		},
		{
			title: "Qué datos recogemos",
			body: [
				"Cuenta: cuando inicias sesión, nuestro proveedor de autenticación Clerk nos da tu nombre, tu correo y tu foto de perfil. Si entras con GitHub o LinkedIn, recibimos el perfil básico que apruebas en esa pantalla: nombre, foto de perfil y correo.",
				"Lo que publicas: tu perfil, los proyectos que compartes y los textos o imágenes que agregues. Esto es público por diseño.",
				"Eventos: para confirmar que estás inscrito en un evento, comparamos el correo de tu cuenta con la lista de invitados del evento en Luma. Si creas un badge del evento, guardamos la foto que subes.",
				"Newsletter: si te suscribes, guardamos tu correo y tu idioma preferido.",
				"Analítica: usamos Vercel Analytics, que cuenta las visitas de forma agregada y no usa cookies de seguimiento.",
			],
		},
		{
			title: "Para qué los usamos",
			body: [
				"Usamos estos datos para iniciar tu sesión, mostrar tu perfil y tus proyectos públicos, darte acceso a los eventos en los que te inscribiste, enviarte el newsletter que pediste y entender qué páginas se usan.",
				"No vendemos tus datos ni los usamos para publicidad.",
			],
		},
		{
			title: "LinkedIn",
			body: [
				"Si conectas LinkedIn, solo recibimos los datos que apruebas en la pantalla de consentimiento de LinkedIn. Los usamos para iniciar tu sesión y completar tu perfil. Nunca publicamos en LinkedIn en tu nombre sin una acción explícita tuya. Puedes revocar el acceso cuando quieras desde la configuración de LinkedIn.",
			],
		},
		{
			title: "Quién los procesa",
			body: [
				"Nos apoyamos en estos proveedores para que el sitio funcione: Clerk (inicio de sesión), Vercel (hosting, analítica y almacenamiento de archivos), Neon (base de datos), Resend (correo) y Luma (inscripción a eventos). Cada uno procesa los datos solo para darnos su servicio.",
			],
		},
		{
			title: "Cuánto tiempo los guardamos",
			body: [
				"Guardamos los datos de tu cuenta mientras la cuenta exista. Los del newsletter, hasta que te des de baja. Los de eventos quedan como parte del registro de ese evento.",
			],
		},
		{
			title: "Tus opciones",
			body: [
				`Puedes pedirnos acceder, corregir o borrar tus datos cuando quieras escribiendo a ${CONTACT}. Puedes darte de baja del newsletter con el link de cualquier correo.`,
			],
		},
		{
			title: "Contacto",
			body: [`Preguntas sobre esta política: ${CONTACT}.`],
		},
	],
};

export function privacyCopy(locale: Locale): PrivacyCopy {
	return locale === "es" ? es : en;
}
