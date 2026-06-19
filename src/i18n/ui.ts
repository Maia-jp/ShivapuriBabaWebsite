// Internationalization (i18n) — single source of truth for locales, UI chrome
// strings, and the pairing between equivalent pages across languages.
//
// English is the default locale and lives at the site root (`/biography`, …).
// Other locales live under a prefix: Brazilian Portuguese uses localized slugs
// (`/pt-br/biografia`); Arabic, Nepali, Hindi and Chinese use English-style
// slugs under `/ar`, `/ne`, `/hi`, `/zh` (clean URLs for non-Latin scripts).
// See LOCALIZATION.md.

export type Locale = 'en' | 'pt-br' | 'ar' | 'ne' | 'hi' | 'zh';

export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALES: Locale[] = ['en', 'pt-br', 'ar', 'ne', 'hi', 'zh'];

// Short label shown in the header language switcher.
export const localeShortLabel: Record<Locale, string> = {
	en: 'EN',
	'pt-br': 'PT',
	ar: 'AR',
	ne: 'NE',
	hi: 'HI',
	zh: 'ZH',
};

// Full language name in its own script (used for the switcher's accessible labels).
export const localeName: Record<Locale, string> = {
	en: 'English',
	'pt-br': 'Português',
	ar: 'العربية',
	ne: 'नेपाली',
	hi: 'हिन्दी',
	zh: '中文',
};

// `<html lang>` value.
export const htmlLang: Record<Locale, string> = {
	en: 'en',
	'pt-br': 'pt-BR',
	ar: 'ar',
	ne: 'ne',
	hi: 'hi',
	zh: 'zh-Hans',
};

// Text direction for `<html dir>`. Arabic is right-to-left.
export const dir: Record<Locale, 'ltr' | 'rtl'> = {
	en: 'ltr',
	'pt-br': 'ltr',
	ar: 'rtl',
	ne: 'ltr',
	hi: 'ltr',
	zh: 'ltr',
};

// Open Graph locale (`og:locale`) value.
export const ogLocale: Record<Locale, string> = {
	en: 'en',
	'pt-br': 'pt_BR',
	ar: 'ar_AR',
	ne: 'ne_NP',
	hi: 'hi_IN',
	zh: 'zh_CN',
};

// BCP-47 tag used for hreflang alternates.
export const hreflang: Record<Locale, string> = {
	en: 'en',
	'pt-br': 'pt-BR',
	ar: 'ar',
	ne: 'ne',
	hi: 'hi',
	zh: 'zh-Hans',
};

interface NavItem {
	// Key into `routes` so the Layout can resolve the right URL per locale.
	key: RouteKey;
	label: string;
}

interface Strings {
	nav: NavItem[];
	footerTagline: string;
	footerAbout: string;
	footerContact: string;
	switcherLabel: string; // accessible label for the language switcher
}

export const ui: Record<Locale, Strings> = {
	en: {
		nav: [
			{ key: 'home', label: 'Home' },
			{ key: 'biography', label: 'Biography' },
			{ key: 'teachings', label: 'Teachings' },
			{ key: 'books', label: 'Books & Media' },
		],
		footerTagline: 'A non-profit, open-source project',
		footerAbout: 'About this site',
		footerContact: 'Contact',
		switcherLabel: 'Language',
	},
	'pt-br': {
		nav: [
			{ key: 'home', label: 'Início' },
			{ key: 'biography', label: 'Biografia' },
			{ key: 'teachings', label: 'Ensinamentos' },
			{ key: 'books', label: 'Livros e Mídia' },
		],
		footerTagline: 'Um projeto sem fins lucrativos e de código aberto',
		footerAbout: 'Sobre este site',
		footerContact: 'Contato',
		switcherLabel: 'Idioma',
	},
	ar: {
		nav: [
			{ key: 'home', label: 'الرئيسية' },
			{ key: 'biography', label: 'السيرة الذاتية' },
			{ key: 'teachings', label: 'التعاليم' },
			{ key: 'books', label: 'الكتب والوسائط' },
		],
		footerTagline: 'مشروع غير ربحي ومفتوح المصدر',
		footerAbout: 'عن هذا الموقع',
		footerContact: 'اتصل بنا',
		switcherLabel: 'اللغة',
	},
	ne: {
		nav: [
			{ key: 'home', label: 'गृहपृष्ठ' },
			{ key: 'biography', label: 'जीवनी' },
			{ key: 'teachings', label: 'शिक्षाहरू' },
			{ key: 'books', label: 'पुस्तक र मिडिया' },
		],
		footerTagline: 'एक गैरनाफामुखी, खुला स्रोत परियोजना',
		footerAbout: 'यस साइटको बारेमा',
		footerContact: 'सम्पर्क',
		switcherLabel: 'भाषा',
	},
	hi: {
		nav: [
			{ key: 'home', label: 'मुखपृष्ठ' },
			{ key: 'biography', label: 'जीवनी' },
			{ key: 'teachings', label: 'शिक्षाएँ' },
			{ key: 'books', label: 'पुस्तकें और मीडिया' },
		],
		footerTagline: 'एक ग़ैर-लाभकारी, ओपन-सोर्स परियोजना',
		footerAbout: 'इस साइट के बारे में',
		footerContact: 'संपर्क',
		switcherLabel: 'भाषा',
	},
	zh: {
		nav: [
			{ key: 'home', label: '首页' },
			{ key: 'biography', label: '生平' },
			{ key: 'teachings', label: '教诲' },
			{ key: 'books', label: '书籍与媒体' },
		],
		footerTagline: '一个非营利、开源的项目',
		footerAbout: '关于本站',
		footerContact: '联系',
		switcherLabel: '语言',
	},
};

// ---------------------------------------------------------------------------
// Route pairing. Every translatable page is one entry; the per-locale value is
// the canonical path (no trailing slash, except the root) used for links,
// the language switcher, and hreflang alternates.
// ---------------------------------------------------------------------------

export type RouteKey = 'home' | 'biography' | 'teachings' | 'rightLiving' | 'books' | 'about';

export const routes: Record<RouteKey, Record<Locale, string>> = {
	home: { en: '/', 'pt-br': '/pt-br', ar: '/ar', ne: '/ne', hi: '/hi', zh: '/zh' },
	biography: {
		en: '/biography',
		'pt-br': '/pt-br/biografia',
		ar: '/ar/biography',
		ne: '/ne/biography',
		hi: '/hi/biography',
		zh: '/zh/biography',
	},
	teachings: {
		en: '/teachings',
		'pt-br': '/pt-br/ensinamentos',
		ar: '/ar/teachings',
		ne: '/ne/teachings',
		hi: '/hi/teachings',
		zh: '/zh/teachings',
	},
	rightLiving: {
		en: '/teachings/right-living',
		'pt-br': '/pt-br/ensinamentos/vida-correta',
		ar: '/ar/teachings/right-living',
		ne: '/ne/teachings/right-living',
		hi: '/hi/teachings/right-living',
		zh: '/zh/teachings/right-living',
	},
	books: {
		en: '/books',
		'pt-br': '/pt-br/livros',
		ar: '/ar/books',
		ne: '/ne/books',
		hi: '/hi/books',
		zh: '/zh/books',
	},
	about: {
		en: '/about',
		'pt-br': '/pt-br/sobre',
		ar: '/ar/about',
		ne: '/ne/about',
		hi: '/hi/about',
		zh: '/zh/about',
	},
};

// Path prefix that identifies each non-default locale.
const localePrefixes: [Locale, string][] = [
	['pt-br', '/pt-br'],
	['ar', '/ar'],
	['ne', '/ne'],
	['hi', '/hi'],
	['zh', '/zh'],
];

/** Locale a given pathname belongs to (default locale for anything unprefixed). */
export function getLocale(pathname: string): Locale {
	for (const [loc, prefix] of localePrefixes) {
		if (pathname === prefix || pathname.startsWith(prefix + '/')) return loc;
	}
	return 'en';
}

/** Normalize a pathname for comparison: strip a trailing slash except on the root. */
export function normalizePath(pathname: string): string {
	return pathname.replace(/(.)\/$/, '$1');
}

/** The RouteKey for a given (normalized) pathname, or null if it isn't a paired route. */
export function routeKeyOf(pathname: string): RouteKey | null {
	const path = normalizePath(pathname);
	for (const key of Object.keys(routes) as RouteKey[]) {
		for (const loc of LOCALES) {
			if (routes[key][loc] === path) return key;
		}
	}
	return null;
}
