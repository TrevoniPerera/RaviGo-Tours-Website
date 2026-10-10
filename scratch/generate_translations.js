const fs = require("fs");
const path = require("path");

const enPath = path.resolve(__dirname, "../messages/en.json");
const en = JSON.parse(fs.readFileSync(enPath, "utf8"));

// Translation dictionaries for German (de), French (fr), Japanese (ja), Italian (it)
const translations = {
  de: {
    meta_review: "Entwurf für Deutsch — bedarf nativer Überprüfung (needs native review)",
    nav: {
      home: "Startseite",
      destinations: "Reiseziele",
      packages: "Touren & Pakete",
      gallery: "Galerie",
      about: "Über Uns",
      contact: "Kontakt",
      openMenu: "Menü öffnen",
      closeMenu: "Menü schließen",
      switchLanguage: "Sprache wechseln"
    },
    hero: {
      headline: "Entdecken Sie Sri Lanka Wie Nie Zuvor",
      subheadline: "Authentische Erlebnisse, persönlich geführt von einem lokalen Guide mit über 20 Jahren Leidenschaft für diese Insel.",
      ctaPrimary: "Touren ansehen",
      ctaSecondary: "WhatsApp Kontakt",
      imageAlt: "Atemberaubender Blick auf die Felsenfestung Sigiriya bei Sonnenaufgang"
    },
    experience: {
      years: "20+",
      label: "Jahre Erfahrung",
      subLabel: "Begleitung internationaler Reisender quer durch Sri Lanka",
      altBadge: "Abzeichen für über 20 Jahre Erfahrung"
    },
    common: {
      loading: "Laden...",
      learnMore: "Mehr erfahren",
      backToList: "Zurück",
      enquireNow: "Jetzt anfragen",
      contactUs: "Kontaktieren Sie uns",
      whatsappUs: "WhatsApp Chat",
      viewPackages: "Touren ansehen",
      bookNow: "Jetzt buchen",
      perPerson: "pro Person",
      skipToContent: "Zum Hauptinhalt springen"
    },
    destinations: {
      heading: "Top Reiseziele",
      subheading: "Zehn ikonische Orte, handverlesen aus über 20 Jahren Reiseleitung.",
      viewAll: "Alle Reiseziele",
      viewDetail: "{name} entdecken",
      relatedPackages: "Passende Touren",
      bestSeason: "Beste Reisezeit",
      suggestedTime: "Empfohlene Dauer",
      hours: "{n} Stunden",
      region: "Region",
      photoSetAlt: "Fotogalerie von {name}"
    },
    packages: {
      heading: "Reisepakete",
      subheading: "Von antiken Tempeln bis zu wilden Safaris – maßgeschneiderte Reisen für jeden Reisenden.",
      viewAll: "Alle Pakete",
      enquire: "Dieses Paket anfragen",
      whatsappEnquire: "Per WhatsApp anfragen",
      duration: "{n} Tage",
      fromPrice: "Ab USD {amount}",
      priceOnRequest: "Preis auf Anfrage",
      included: "Inbegriffen",
      excluded: "Nicht inbegriffen",
      itinerary: "Tagesablauf & Route",
      day: "Tag {n}",
      overnight: "Übernachtung: {place}",
      customTourCta: "Eigene Tour planen",
      customTourNote: "Jede Reise ist einzigartig – gestalten wir Ihre gemeinsam."
    },
    gallery: {
      heading: "Momente Unserer Reisenden",
      subheading: "Echte Erlebnisse. Echtes Lächeln. Echtes Sri Lanka.",
      openLightbox: "Foto ansehen: {caption}",
      close: "Schließen",
      previous: "Vorheriges Foto",
      next: "Nächstes Foto",
      consentNote: "Alle Fotos mit schriftlicher Genehmigung der Reisenden veröffentlicht."
    },
    about: {
      heading: "Ihr Guide, Ihre Insel",
      subheading: "Lernen Sie Ravi kennen – und die Geschichte hinter RaviGo Tours.",
      story: "Seit 2005 begleite ich Reisende aus aller Welt durch die faszinierende Vielfalt Sri Lankas. Was als Begeisterung für unsere reiche Geschichte begann, wurde zu einer lebenslangen Leidenschaft. RaviGo Tours steht für persönliche Fürsorge, sichere Reisen und unvergessliche Begegnungen abseits der Massen.",
      guidePhotoAlt: "Foto von Ravi, Ihrem Reiseleiter in Sri Lanka",
      languagesSpoken: "Gesprochene Sprachen",
      languages: ["Englisch", "Singhalesisch", "Tamil", "Deutsch (Grundkenntnisse)"],
      teamHeading: "Unser Team",
      credibilityHeading: "Warum RaviGo Tours?",
      credibility: {
        yearsLabel: "Jahre Reiseleitung",
        satisfaction: "Gästezufriedenheit",
        satisfactionNote: "Persönliche Betreuung von Ankunft bis Abreise"
      }
    },
    contactCta: {
      heading: "Bereit für Ihre Sri Lanka Reise?",
      subheading: "Ob vollständige Rundreise oder entspannter Tagesausflug – wir stellen Ihre perfekte Reiseroute zusammen.",
      call: "Direkt anrufen",
      whatsapp: "WhatsApp Chat",
      email: "E-Mail senden",
      detailedForm: "Zum Kontaktformular"
    },
    footer: {
      tagline: "Sri Lanka – Speziell für Sie gestaltet",
      linksHeading: "Entdecken",
      contactHeading: "Kontakt",
      followHeading: "Folgen Sie uns",
      copyright: "© {year} RaviGo Tours. Alle Rechte vorbehalten.",
      privacy: "Datenschutzhinweis",
      madeWith: "Mit ❤️ in Sri Lanka gestaltet"
    }
  },
  fr: {
    meta_review: "Ébauche en français — nécessite une révision native (needs native review)",
    nav: {
      home: "Accueil",
      destinations: "Destinations",
      packages: "Circuits",
      gallery: "Galerie",
      about: "À Propos",
      contact: "Contact",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      switchLanguage: "Changer de langue"
    },
    hero: {
      headline: "Découvrez le Sri Lanka Comme Jamais",
      subheadline: "Des expériences authentiques conçues par un guide local avec plus de 20 ans de passion pour cette île.",
      ctaPrimary: "Voir les circuits",
      ctaSecondary: "Contactez-nous sur WhatsApp",
      imageAlt: "Vue imprenable sur la forteresse de Sigiriya au lever du soleil"
    },
    experience: {
      years: "20+",
      label: "Années d'Expérience",
      subLabel: "Guidage de voyageurs internationaux à travers le Sri Lanka",
      altBadge: "Badge de plus de 20 ans d'expérience"
    },
    common: {
      loading: "Chargement...",
      learnMore: "En savoir plus",
      backToList: "Retour",
      enquireNow: "Demander un devis",
      contactUs: "Contactez-nous",
      whatsappUs: "Chatter sur WhatsApp",
      viewPackages: "Voir les circuits",
      bookNow: "Réserver",
      perPerson: "par personne",
      skipToContent: "Passer au contenu principal"
    },
    destinations: {
      heading: "Meilleures Destinations",
      subheading: "Dix lieux emblématiques, sélectionnés avec soin après plus de 20 ans d'expérience.",
      viewAll: "Toutes les destinations",
      viewDetail: "Explorer {name}",
      relatedPackages: "Circuits associés",
      bestSeason: "Meilleure saison",
      suggestedTime: "Durée recommandée",
      hours: "{n} heures",
      region: "Région",
      photoSetAlt: "Galerie photo de {name}"
    },
    packages: {
      heading: "Nos Circuits & Forfaits",
      subheading: "Des cités anciennes aux safaris sauvages — des voyages sur mesure pour chaque voyageur.",
      viewAll: "Tous les circuits",
      enquire: "Demander des infos pour ce circuit",
      whatsappEnquire: "Demander sur WhatsApp",
      duration: "{n} Jours",
      fromPrice: "À partir de USD {amount}",
      priceOnRequest: "Tarif sur demande",
      included: "Inclus",
      excluded: "Non inclus",
      itinerary: "Itinéraire détaillé",
      day: "Jour {n}",
      overnight: "Nuit à : {place}",
      customTourCta: "Créer votre propre circuit",
      customTourNote: "Chaque voyage est unique — concevons le vôtre ensemble."
    },
    gallery: {
      heading: "Moments Partagés par Nos Voyageurs",
      subheading: "De vrais souvenirs. De vrais sourires. Le vrai Sri Lanka.",
      openLightbox: "Voir la photo : {caption}",
      close: "Fermer",
      previous: "Photo précédente",
      next: "Photo suivante",
      consentNote: "Toutes les photos sont publiées avec l'accord écrit des voyageurs."
    },
    about: {
      heading: "Votre Guide, Votre Île",
      subheading: "Rencontrez Ravi — et découvrez l'histoire de RaviGo Tours.",
      story: "Depuis 2005, j'ai le privilège d'accompagner des voyageurs du monde entier sur notre île magnifique. RaviGo Tours offre des voyages privés, flexibles et authentiques, loin des sentiers battus, avec une attention chaleureuse à chaque détail.",
      guidePhotoAlt: "Photo de Ravi, votre guide au Sri Lanka",
      languagesSpoken: "Langues parlées",
      languages: ["Anglais", "Cinghalais", "Tamoul", "Français (notions)"],
      teamHeading: "Notre Équipe",
      credibilityHeading: "Pourquoi Choisir RaviGo ?",
      credibility: {
        yearsLabel: "Années de Guidage",
        satisfaction: "Satisfaction Client",
        satisfactionNote: "Accompagnement personnalisé de l'arrivée au départ"
      }
    },
    contactCta: {
      heading: "Prêt à Planifier Votre Séjour au Sri Lanka ?",
      subheading: "Que ce soit pour un grand tour de l'île ou une excursion d'une journée, concevons ensemble votre voyage idéal.",
      call: "Appeler directement",
      whatsapp: "Discuter sur WhatsApp",
      email: "Envoyer un e-mail",
      detailedForm: "Formulaire complet"
    },
    footer: {
      tagline: "Le Sri Lanka pensé pour vous",
      linksHeading: "Explorer",
      contactHeading: "Contact",
      followHeading: "Suivez-nous",
      copyright: "© {year} RaviGo Tours. Tous droits réservés.",
      privacy: "Politique de confidentialité",
      madeWith: "Conçu avec ❤️ au Sri Lanka"
    }
  },
  ja: {
    meta_review: "日本語ドラフト — ネイティブレビューが必要です (needs native review)",
    nav: {
      home: "ホーム",
      destinations: "観光地",
      packages: "ツアープラン",
      gallery: "ギャラリー",
      about: "ガイド紹介",
      contact: "お問い合わせ",
      openMenu: "メニューを開く",
      closeMenu: "メニューを閉じる",
      switchLanguage: "言語を切り替える"
    },
    hero: {
      headline: "スリランカの魅力、心に残る旅へ",
      subheadline: "20年以上の経験を持つ現地専属ガイドが、あなただけの特別なスリランカ旅行をご案内します。",
      ctaPrimary: "ツアープランを見る",
      ctaSecondary: "WhatsAppでお問い合わせ",
      imageAlt: "朝日に輝くシギリヤロックの絶景"
    },
    experience: {
      years: "20+",
      label: "年のガイド実績",
      subLabel: "世界中のお客様をスリランカ全土へご案内",
      altBadge: "ガイド歴20年以上のバッジ"
    },
    common: {
      loading: "読み込み中...",
      learnMore: "詳細を見る",
      backToList: "戻る",
      enquireNow: "今すぐ問い合わせる",
      contactUs: "お問い合わせ",
      whatsappUs: "WhatsAppで相談",
      viewPackages: "ツアーを見る",
      bookNow: "予約を申し込む",
      perPerson: "お一人様あたり",
      skipToContent: "メインコンテンツへスキップ"
    },
    destinations: {
      heading: "厳選観光地",
      subheading: "20年以上の経験から選りすぐった、スリランカの必見スポット10選。",
      viewAll: "すべての観光地",
      viewDetail: "{name}の詳細",
      relatedPackages: "関連ツアー",
      bestSeason: "ベストシーズン",
      suggestedTime: "推奨所要時間",
      hours: "{n}時間",
      region: "エリア",
      photoSetAlt: "{name}のフォトギャラリー"
    },
    packages: {
      heading: "おすすめツアープラン",
      subheading: "世界遺産から大自然のサファリまで、自由自在にアレンジできる専用車ツアー。",
      viewAll: "すべてのプラン",
      enquire: "このプランを問い合わせる",
      whatsappEnquire: "WhatsAppで問い合わせる",
      duration: "{n}日間",
      fromPrice: "USD {amount}〜",
      priceOnRequest: "料金はお問い合わせ",
      included: "ツアーに含まれるもの",
      excluded: "含まれないもの",
      itinerary: "日別モデル日程",
      day: "{n}日目",
      overnight: "宿泊地: {place}",
      customTourCta: "オーダーメイドツアーを作成",
      customTourNote: "お客様のご希望に合わせた完全プライベートプランを作成します。"
    },
    gallery: {
      heading: "旅の思い出ギャラリー",
      subheading: "実際にご参加いただいたお客様の笑顔と絶景の瞬間。",
      openLightbox: "写真を表示: {caption}",
      close: "閉じる",
      previous: "前の写真",
      next: "次の写真",
      consentNote: "※掲載写真はすべてお客様の事前承諾を得て掲載しております。"
    },
    about: {
      heading: "あなた専属の現地ガイド",
      subheading: "代表兼ガイド ラヴィとRaviGo Toursについて",
      story: "2005年より、日本をはじめ世界各国からの旅行者の皆様を安全かつ快適にスリランカ各地へご案内してまいりました。個人旅行ならではの柔軟なスケジュールと、温かいおもてなしをお約束いたします。",
      guidePhotoAlt: "専属ガイド ラヴィの写真",
      languagesSpoken: "対応言語",
      languages: ["英語", "シンハラ語", "タミル語", "日本語（日常会話・歓迎）"],
      teamHeading: "運営体制",
      credibilityHeading: "RaviGo Toursが選ばれる理由",
      credibility: {
        yearsLabel: "年の実績",
        satisfaction: "高いお客様満足度",
        satisfactionNote: "空港送迎から旅の終わりまで万全のサポート"
      }
    },
    contactCta: {
      heading: "スリランカ旅行のご計画はお任せください",
      subheading: "周遊ツアーから1日観光まで、ご希望に合わせたプランをご提案いたします。",
      call: "直接お電話",
      whatsapp: "WhatsAppでチャット",
      email: "メールで問い合わせ",
      detailedForm: "お問い合わせフォーム"
    },
    footer: {
      tagline: "あなただけの特別なスリランカ旅行をデザイン",
      linksHeading: "メニュー",
      contactHeading: "連絡先",
      followHeading: "公式SNS",
      copyright: "© {year} RaviGo Tours. All rights reserved.",
      privacy: "プライバシーポリシー",
      madeWith: "スリランカより心を込めて制作"
    }
  },
  it: {
    meta_review: "Bozza in italiano — richiede revisione madrelingua (needs native review)",
    nav: {
      home: "Home",
      destinations: "Destinazioni",
      packages: "Pacchetti Tour",
      gallery: "Galleria",
      about: "Chi Siamo",
      contact: "Contatti",
      openMenu: "Apri menu",
      closeMenu: "Chiudi menu",
      switchLanguage: "Cambia lingua"
    },
    hero: {
      headline: "Scopri lo Sri Lanka Come Mai Prima d'Ora",
      subheadline: "Esperienze autentiche create da una guida locale con oltre 20 anni di passione per quest'isola straordinaria.",
      ctaPrimary: "Scopri i tour",
      ctaSecondary: "Scrivici su WhatsApp",
      imageAlt: "Spettacolare fortezza rocciosa di Sigiriya all'alba"
    },
    experience: {
      years: "20+",
      label: "Anni di Esperienza",
      subLabel: "Oltre vent'anni al fianco di viaggiatori da tutto il mondo",
      altBadge: "Badge oltre 20 anni di esperienza"
    },
    common: {
      loading: "Caricamento...",
      learnMore: "Scopri di più",
      backToList: "Indietro",
      enquireNow: "Richiedi informazioni",
      contactUs: "Contattaci",
      whatsappUs: "Chatta su WhatsApp",
      viewPackages: "Vedi i pacchetti",
      bookNow: "Prenota ora",
      perPerson: "a persona",
      skipToContent: "Vai al contenuto principale"
    },
    destinations: {
      heading: "Le Migliori Destinazioni",
      subheading: "Dieci mete iconiche selezionate con cura in oltre 20 anni di esperienza sul campo.",
      viewAll: "Tutte le destinazioni",
      viewDetail: "Esplora {name}",
      relatedPackages: "Tour correlati",
      bestSeason: "Miglior periodo",
      suggestedTime: "Tempo consigliato",
      hours: "{n} ore",
      region: "Regione",
      photoSetAlt: "Galleria fotografica di {name}"
    },
    packages: {
      heading: "I Nostri Pacchetti Tour",
      subheading: "Dalle antiche città ai safari nella giungla: viaggi su misura per ogni viaggiatore.",
      viewAll: "Tutti i tour",
      enquire: "Richiedi questo pacchetto",
      whatsappEnquire: "Scrivi su WhatsApp",
      duration: "{n} Giorni",
      fromPrice: "Da USD {amount}",
      priceOnRequest: "Prezzo su richiesta",
      included: "Incluso",
      excluded: "Non incluso",
      itinerary: "Itinerario giorno per giorno",
      day: "Giorno {n}",
      overnight: "Pernottamento: {place}",
      customTourCta: "Crea il tuo tour personalizzato",
      customTourNote: "Ogni viaggio è speciale — creiamo insieme la tua avventura."
    },
    gallery: {
      heading: "Momenti dei Nostri Viaggiatori",
      subheading: "Esperienze vere. Sorrisi autentici. Il vero Sri Lanka.",
      openLightbox: "Visualizza foto: {caption}",
      close: "Chiudi",
      previous: "Foto precedente",
      next: "Foto successiva",
      consentNote: "Tutte le foto sono pubblicate con il consenso scritto dei viaggiatori."
    },
    about: {
      heading: "La Tua Guida, La Tua Isola",
      subheading: "Incontra Ravi — e la storia di RaviGo Tours.",
      story: "Dal 2005 accompagno viaggiatori internazionali tra le meraviglie dello Sri Lanka. RaviGo Tours offre tour privati curati nei minimi dettagli, con flessibilità, sicurezza e profonda conoscenza locale.",
      guidePhotoAlt: "Foto di Ravi, guida turistica in Sri Lanka",
      languagesSpoken: "Lingue parlate",
      languages: ["Inglese", "Singalese", "Tamil", "Italiano (base/accoglienza)"],
      teamHeading: "Il Nostro Team",
      credibilityHeading: "Perché Scegliere RaviGo?",
      credibility: {
        yearsLabel: "Anni di Esperienza",
        satisfaction: "Soddisfazione Clienti",
        satisfactionNote: "Assistenza costante dall'arrivo alla partenza"
      }
    },
    contactCta: {
      heading: "Pronto a Pianificare il Tuo Viaggio in Sri Lanka?",
      subheading: "Dal tour completo a escursioni su misura: organizziamo la soluzione ideale per te.",
      call: "Chiama direttamente",
      whatsapp: "Chatta su WhatsApp",
      email: "Invia una email",
      detailedForm: "Modulo di richiesta"
    },
    footer: {
      tagline: "Lo Sri Lanka su misura per te",
      linksHeading: "Esplora",
      contactHeading: "Contatti",
      followHeading: "Seguici",
      copyright: "© {year} RaviGo Tours. Tutti i diritti riservati.",
      privacy: "Informativa sulla privacy",
      madeWith: "Creato con ❤️ in Sri Lanka"
    }
  }
};

// Deep merge helper
function deepMerge(target, source) {
  const output = { ...target };
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === "object" && source[key] !== null && !Array.isArray(source[key])) {
        output[key] = deepMerge(target[key] || {}, source[key]);
      } else {
        output[key] = source[key];
      }
    }
  }
  return output;
}

for (const lang of ["de", "fr", "ja", "it"]) {
  const merged = deepMerge(en, translations[lang]);
  const outPath = path.resolve(__dirname, `../messages/${lang}.json`);
  fs.writeFileSync(outPath, JSON.stringify(merged, null, 2), "utf8");
  console.log(`Generated messages/${lang}.json`);
}
