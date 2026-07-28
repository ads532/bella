/* ==========================================================================
   Bella Esperanza | BE — bilingual layer (IT ⇄ EN)

   How it works
   ------------
   Italian is written directly into the HTML, so the page is fully readable
   and indexable without JavaScript. This file only holds the ENGLISH
   strings; switching to EN swaps them in, switching back to IT restores the
   original markup that was cached on first use.

   To edit a text: change it in the HTML for Italian, change it here for
   English. The key in `data-i18n="…"` links the two.
   ========================================================================== */
(function () {
  'use strict';

  var EN = {
    /* --- generic UI ---------------------------------------------------- */
    'a11y.skip': 'Skip to content',
    'ui.copyIban': 'Copy IBAN',
    'ui.copyCode': 'Copy code',
    'ui.copied': 'Copied!',

    'nav.story': 'Our story',
    'nav.project': 'The project',
    'nav.creativity': 'Creativity',
    'nav.method': 'How we work',
    'nav.community': 'Community',
    'nav.magazine': 'Magazine',
    'nav.donate': 'Donate now',

    'cta.donate': 'Donate now',
    'cta.discover': 'Discover our story',
    'cta.readmore': 'Read more',
    'cta.5x1000': 'Give us your 5×1000',

    /* --- hero ----------------------------------------------------------- */
    'hero.eyebrow': 'Non-profit organisation · Italy &amp; Tanzania',
    'hero.title': 'Creativity for education and social change',
    'hero.lede': 'We build schools, bring art where it is needed and grow a global community that makes giving part of everyday life.',
    'hero.stat1': 'children in school by 2027',
    'hero.stat2': 'of online donations to the project',
    'hero.stat3': 'year we were founded',
    'hero.scroll': 'Scroll',

    /* --- mission -------------------------------------------------------- */
    'mission.eyebrow': 'Why BE?',
    'mission.title': 'Education is a fundamental human right and the greatest equaliser.',
    'mission.p1': 'Our mission is to create a global community of people and, together, bring education to children by building schools and securing access to creativity.',
    'mission.p2': 'Bella Esperanza | BE is an Italian non-profit organisation building a global charity movement for the new generation. It was founded in 2023, inspired by Alexandra Pfeifer’s volunteering experiences in Tanzania.',
    'mission.p3': 'Our first pilot project is in Tanzania, where we are building our school in Ugwachanya.',
    'mission.link': 'Discover the project',
    'mission.promise': 'Our promise to every child: <span class="mark">become who you were born to BE.</span>',

    /* --- story ---------------------------------------------------------- */
    'story.eyebrow': 'Our (love) story',
    'story.title': 'It is pure love. From the beginning to infinity.',
    'story.lede': 'In 2017 our founder Alexandra met Esperanza, a 2-year-old girl, at the Tosamaganga orphan centre in Tanzania. That bond turned into a mission.',
    'story.cap1': 'Esperanza aged 2, at the orphanage',
    'story.cap2': 'Esperanza aged 9, at our school',
    'story.p1': 'Their bond gave life to a mission: to provide education to children like Esperanza, who face an uncertain future after having to leave the orphanage at the age of six and return to relatives who are often unable to care for them properly.',
    'story.p2': 'Alexandra promised Esperanza she would get the chance to go to school. That promise became the foundation of Bella Esperanza | BE.',
    'story.p3': 'In 2023 Esperanza started attending the first school BE is building — the promise was kept.',
    'story.quote': 'In Spanish, Esperanza means hope. At Bella Esperanza we do not only believe in hope: we live it. And we care about keeping our promises.',

    /* --- why education -------------------------------------------------- */
    'edu.eyebrow': 'Why education?',
    'edu.title': 'We are in a global education crisis.',
    'edu.lede': 'Education is more than a right: it is the foundation for opportunity, equality and hope. Yet millions of children are deprived of this essential tool for a better future.',
    'edu.s1pre': 'Right now there are',
    'edu.s1post': 'million children worldwide who do not go to school.',
    'edu.s2pre': 'If we do not act now',
    'edu.s2post': 'million young people will lack the skills needed to be an adequate workforce in 2030.',
    'edu.s3pre': 'That is',
    'edu.s3post': 'of the world population. 1 in 10 of us.',
    'edu.pull': 'The new generations are our future and tomorrow’s leaders. Education is power.',
    'edu.r1t': 'Drives economic growth',
    'edu.r1p': 'Supporting early learning is the best investment a government can make, returning $17 for every $1 invested in early childhood.',
    'edu.r2t': 'Empowers future generations',
    'edu.r2p': 'Investing in education today lays the foundation for future leaders and innovators, ensuring long-term progress and resilience.',
    'edu.r3t': 'International cooperation',
    'edu.r3p': 'Education fosters a deeper understanding of global issues, different cultures and different perspectives.',
    'edu.r4t': 'Less poverty and child labour',
    'edu.r4p': 'Skills and knowledge create better job opportunities, which can lift entire families and communities out of poverty.',
    'edu.r5t': 'Reduced migration',
    'edu.r5p': 'Education reduces conflict and migration by fostering understanding, creating stability and offering opportunities close to home.',
    'edu.r6t': 'Better health',
    'edu.r6p': 'Education raises awareness of health issues, lowering mortality rates and improving general health.',
    'edu.r7t': 'Gender equality',
    'edu.r7p': 'Access to education, especially for girls, enables women to take full part in economic, social and political life.',
    'edu.r8t': 'Climate change',
    'edu.r8p': 'Education builds the awareness and skills needed for sustainable practices, addressing critical issues such as resource conservation.',

    /* --- school --------------------------------------------------------- */
    'school.eyebrow': 'Our school',
    'school.title': 'A transformative start in Ugwachanya, Tanzania.',
    'school.lede': 'The first primary school we are building will give 360 children access to education by 2027.',
    'school.p1': 'Since 2021 we have been working with the Province of Bolzano, an Italian non-profit organisation and local partners in Tanzania on our first pilot project in Ugwachanya. This initiative marks the beginning of our journey to bring education and opportunity to underserved communities.',
    'school.p2': 'The school, run and administered by our local partners, the Teresine Sisters, is a concrete example of the power of collaboration. It offers not only education, but the chance of a better future for every one of our students.',
    'school.p3': 'It is carefully designed to support both learning and wellbeing.',
    'school.facilities': 'What the school includes',
    'school.f1': 'Classrooms',
    'school.f2': 'Bathrooms',
    'school.f3': 'Dormitories for 100 children',
    'school.f4': 'Offices',
    'school.f5': 'Kitchen',
    'school.f6': 'Canteen',
    'school.f7': 'Laundry',
    'school.f8': 'Teachers’ house',
    'school.f9': 'Sports field',
    'school.f10': 'Administration building',
    'school.f11': 'Library',

    /* --- creativity ----------------------------------------------------- */
    'creative.eyebrow': 'Creativity',
    'creative.title': 'Art is not for a privileged few. To be human is to be creative.',
    'creative.lede': 'We believe creativity, in all its forms, is a tool for education and a driver of social change. We use the power of art, music and culture as our main fundraising vehicles.',
    'creative.p1t': 'Art',
    'creative.p1s': 'Workshops and murals with international artists',
    'creative.p2t': 'Music',
    'creative.p2s': 'Events and experiences that raise funds',
    'creative.p3t': 'Culture',
    'creative.p3s': 'Cultures meeting, from Italy to Tanzania',
    'creative.quote': '“Every child is an artist. The problem is how to remain an artist once we grow up.”',
    'creative.p4': 'That is why we work with local and international artists and run art and music courses and workshops with them, to make education more colourful, more creative and above all more accessible.',

    'art.a1r': 'Contemporary artist',
    'art.a1d': 'Art workshop with our students and painting of our school’s mural.',
    'art.a2r': 'Food writer &amp; gastronome',
    'art.a2d': 'Cooking class at the orphan centre: fresh pasta for 100 children.',
    'art.a3r': 'Street artist',
    'art.a3d': 'Screen-printing class with our students, setting up the school’s screen-printing studio and creating murals.',
    'art.a4r': 'Artist from Iringa',
    'art.a4d': 'Screen-printing class with our students together with Denis Ouch, and creation of a mural.',
    'art.a5r': 'Contemporary artist',
    'art.a5d': 'Art class with our students and creation of a mural.',
    'art.a6r': 'Multidisciplinary artist and designer',
    'art.a6d': 'Ubuntu project: a participatory artwork with our students and creation of a mural.',

    /* --- method --------------------------------------------------------- */
    'method.eyebrow': 'How we work',
    'method.title': 'The Charity&nbsp;3C model',
    'method.lede': 'Our goal is to build an innovative charity project for a new generation. All our work rests on three principles.',
    'method.c1t': 'Credible',
    'method.c1p': 'We are committed to transparency and trust. Every cent of your online donation goes entirely to building the school. We guarantee this through our two-bank-account system.',
    'method.c2t': 'Collaborative',
    'method.c2p': 'We work with local experts to build our school project. Our partners have years of experience and deep knowledge of how to deliver school projects in their area.',
    'method.c3t': 'Contemporary',
    'method.c3p': 'We believe in the power of brands to inspire change. That is why we are building a contemporary brand that carries messages of hope, not pity, for the new generation.',

    'values.title': 'Our values',
    'values.lede': 'We believe in empowering communities through innovation and creativity, championing diversity and staying true to our mission.',
    'values.v1t': 'Collaboration',
    'values.v1p': 'We build partnerships with individuals, companies, brands and communities to widen our impact together.',
    'values.v2t': 'Kindness',
    'values.v2p': 'We believe in the transformative power of compassion: everyone should feel valued and inspired to take part.',
    'values.v3t': 'Inclusion',
    'values.v3p': 'We make sure everyone has access to opportunity and feels welcome in our community.',
    'values.v4t': 'Respect',
    'values.v4p': 'We respect the dignity, rights and voices of every child and every community we serve.',
    'values.v5t': 'Innovation',
    'values.v5p': 'We look for creative solutions to the challenges of education and charity in the modern world.',
    'values.v6t': 'Diversity',
    'values.v6p': 'We value unique perspectives and celebrate diversity as a source of strength and inspiration.',
    'values.v7t': 'Authenticity',
    'values.v7p': 'We value honesty, transparency and staying true to our roots.',

    /* --- transparency --------------------------------------------------- */
    'trans.eyebrow': 'Transparency',
    'trans.title': 'Two accounts. No doubt about where your money goes.',
    'trans.lede': 'We keep two separate bank accounts: one for the school project and one for operating costs, which are covered by a group of generous private donors. Your online donation goes entirely to the school project.',
    'trans.tag1': 'Account 1 · School construction',
    'trans.tag2': 'Account 2 · Operating costs',
    'trans.bank': 'Bank',

    /* --- friends -------------------------------------------------------- */
    'friends.eyebrow': 'BEvolution',
    'friends.title': 'A global community of good souls.',
    'friends.lede': 'Artists and changemakers from art, fashion, music and sport support us in making charity creative — and part of our lifestyle.',
    'friends.q1': 'As an African I know how hard it is to access education, especially in some parts of Africa. Not everyone is privileged enough to receive an education. BE is creating awareness and opportunities for young people’s futures. I feel privileged to be part of this organisation.',
    'friends.r1': 'Activist &amp; actor · Rome, Italy',
    'friends.q2': 'Being based in Tanzania, where BE operates, I am very proud to support and locally supervise its first pilot project. For me education is crucial for the future of Africa. BE directly reaches a society that had lost hope.',
    'friends.r2': 'BBC journalist, diplomat · Dar es Salaam, Tanzania',
    'friends.q3': 'As a child I thought charity only meant money. Having grown up with limited means, I could not see how I could make a difference. BE’s innovative approach lets people like me drive social change through art.',
    'friends.r3': 'Musician, activist, actor · Milan, Italy',
    'friends.q4': 'BE is building a global network of experts and bringing activists together. If we want faster impact on the world, we need strong cooperation between businesses, organisations and the public sector. It is exciting to be part of a movement where art builds collaboration around education.',
    'friends.r4': 'CEO Mandag · Helsinki, Finland',
    'friends.q5': 'Giving something back matters to me, and I am happy to create social change with BE. Thanks to BE I have already met many incredible people who, like me, decided to join this mission and ask for nothing in return.',
    'friends.r5': 'Content creator · Reggio Emilia, Italy',
    'friends.q6': 'Education is an absolutely crucial topic when thinking about the future of Africa — and for me Africa is the future. BE is new, fresh and exciting, created by a group of people inspired by something I have never seen before in the NGO sector. I am very grateful to be part of it.',
    'friends.r6': 'Human rights journalist · Rome, Italy',

    /* --- team ----------------------------------------------------------- */
    'team.eyebrow': 'The team',
    'team.title': 'Change does not happen on its own.',
    'team.lede': 'In a volunteer organisation, where people give their time, energy and heart, teamwork is not just important — it is essential.',
    'team.r1': 'President &amp; founder',
    'team.r2': 'Vice-president',
    'team.r3': 'Board member',

    /* --- partners ------------------------------------------------------- */
    'partners.eyebrow': 'In good company',
    'partners.title': 'Brands and people who turned a vision into reality.',
    'partners.thanks': 'Special thanks to Karlheinz Salzburger, Esemplare and Mirai Bay, who laid the foundations of our project.',

    /* --- co-create ------------------------------------------------------ */
    'cocreate.eyebrow': 'Co-creation',
    'cocreate.title': 'Let’s build a project that makes a difference.',
    'cocreate.lede': 'We work with brands and companies to create tailor-made projects aligned with your goals and values. We can do it for you, or with you, on our next trip to Tanzania.',
    'cocreate.cta': 'Get in touch',
    'cocreate.cases': 'See the collaborations',

    /* --- support -------------------------------------------------------- */
    'support.eyebrow': 'Get involved',
    'support.title': 'Five ways to help us.',
    'support.lede': 'Your involvement amplifies our mission and inspires others to act. Let’s act today: only together can we create a better future.',
    'support.s1t': 'Spread the word',
    'support.s1p': 'Talking about our cause makes our goals visible to new people.',
    'support.s2t': 'Join our events',
    'support.s2p': 'Help us turn them into unforgettable, high-impact moments.',
    'support.s3t': 'Partner with us',
    'support.s3p': 'Let’s create projects and experiences that drive meaningful change.',
    'support.s4t': 'Become a volunteer',
    'support.s4p': 'Join the Bella Esperanza team and help us build a better future.',
    'support.s5t': 'Create action',
    'support.s5p': 'Share our mission within your network and let others support our work.',
    'support.s6t': 'Become a BEfriend',
    'support.s6p': 'Join us today and bring hope: write to info@bellaesperanza.org.',

    /* --- magazine teaser ------------------------------------------------ */
    'mag.eyebrow': 'BE Magazine',
    'mag.title': 'Our collaborations',
    'mag.lede': 'Stay up to date with everything happening in the world of Bella Esperanza.',
    'mag.p1': 'Milan Relay Marathon 2024: sport and fundraising for education in underserved communities.',
    'mag.p2': 'An ethical fashion brand donating 100% of its profits to our mission.',
    'mag.p3': 'Charity partner of Women in the Industry during Milan Music Week at the Apollo Club.',
    'mag.all': 'All articles',

    /* --- contact -------------------------------------------------------- */
    'contact.eyebrow': 'Let’s stay in touch',
    'contact.title': 'Join our BEvolution.',
    'contact.lede': 'Subscribe to the newsletter and receive meaningful updates and inspiring stories. No spam.',
    'contact.emaillabel': 'Email address',
    'contact.placeholder': 'your@email.com',
    'contact.submit': 'Subscribe',
    'contact.note': 'You can unsubscribe at any time.',
    'contact.success': 'Thank you! You have been added to the list.',
    'contact.direct': 'Direct contacts',
    'contact.general': 'General enquiries and partnerships',
    'contact.president': 'President · Alexandra Pfeifer',
    'contact.vice': 'Vice-president · Johannes March',
    'contact.board': 'Board member · Alessandro Mele',
    'contact.address': 'Registered office',

    /* --- footer --------------------------------------------------------- */
    'footer.tag': 'Creativity for education and social change. A non-profit organisation (ODV) based in Laives, South Tyrol.',
    'footer.explore': 'Explore',
    'footer.participate': 'Get involved',
    'footer.contact': 'Contact',
    'footer.bank': 'School account',
    'footer.5x1000': '5×1000',
    'footer.support': 'Support us',
    'footer.cocreate': 'Co-creation',
    'footer.volunteer': 'Become a volunteer',
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookie Policy',
    'footer.credits': 'Credits',

    /* --- donate page ---------------------------------------------------- */
    'donate.eyebrow': 'Make your donation',
    'donate.title': '100% goes to the school.',
    'donate.lede': 'Let’s create a world where every child has the right to learn and grow. Donate now and take part in Bella Esperanza’s journey towards a brighter tomorrow.',
    'donate.online': 'Online donation',
    'donate.onlineTitle': 'One gesture, one future.',
    'donate.onlineLede': 'Online donations are handled securely by Donorbox and go entirely to the school project. You can give once or set up a recurring donation.',
    'donate.donorbox': 'Donate with Donorbox',
    'donate.transferCta': 'I prefer a bank transfer',
    'donate.secure': 'Secure payment · Credit card, PayPal, Apple&nbsp;Pay and Google&nbsp;Pay',
    'donate.i1t': '€25',
    'donate.i1p': 'School and art supplies for one class during a workshop.',
    'donate.i2t': '€75',
    'donate.i2p': 'Furniture and equipment for one study place in the new school.',
    'donate.i3t': '€250',
    'donate.i3p': 'A concrete contribution to building one of the 10 classrooms.',
    'donate.iNote': 'Indicative examples: every donation goes into the account dedicated to building the school.',
    'donate.impactEyebrow': 'Your impact',
    'donate.impactTitle': 'What we are building with your help.',
    'donate.impactLede': 'The first primary school in Ugwachanya, Tanzania, run by the Teresine Sisters, will give 360 children access to education by 2027.',
    'donate.k1pre': 'By 2027',
    'donate.k1post': 'children will have access to education.',
    'donate.k2pre': 'Of your online donation',
    'donate.k2post': 'funds the school project — never operating costs.',
    'donate.k3pre': 'A campus with',
    'donate.k3post': 'classrooms, two dormitories, a library, a canteen and a sports field.',
    'donate.transferTitle': 'Donate by bank transfer.',
    'donate.otherEyebrow': 'Other ways to help',
    'donate.otherTitle': 'Not only money.',
    'donate.otherLede': 'Your involvement amplifies our mission and inspires others to act.',
    'donate.o1t': 'Co-create with your brand',
    'donate.o1p': 'Let’s design a tailor-made initiative for your company. Write to info@bellaesperanza.org.',
    'donate.o2t': 'Become a BEfriend',
    'donate.o2p': 'Join our global community and carry the mission into your network.',
    'donate.o3t': 'Volunteer',
    'donate.o3p': 'Give your time and skills, in Italy or in Tanzania.',
    'donate.write': 'Get in touch',
    'donate.allWays': 'All the ways to take part',

    'fivex.eyebrow': '5×1000',
    'fivex.title': 'A concrete gesture that costs you nothing.',
    'fivex.lede': 'In your Italian tax return, sign in the box for volunteer organisations and enter Bella Esperanza ODV’s fiscal code.',
    'fivex.tag': 'Fiscal code',
    'fivex.cf': 'Bella Esperanza ODV',

    /* --- magazine page -------------------------------------------------- */
    'magpage.title': 'Our collaborations',
    'magpage.lede': 'We believe in inspiring people and creating a movement of change and love through collaboration. Here is who walks with us.',
    'magpage.partner': 'Partner',
    'magpage.charity': 'Charity partner',
    'magpage.on.sub': 'Driving social change and energising the new generations.',
    'magpage.on.p1': 'In April 2024 we partnered with ON for the Milan Relay Marathon, combining the power of sport with fundraising for education in underserved communities. Together we created a movement that highlighted the transformative impact of access to learning.',
    'magpage.on.l1': '<b>An exclusive training session</b> with the ON team and elite athletes from Tuscany Camp.',
    'magpage.on.l2': '<b>Running the relay marathon</b>, in a spirit of perseverance and shared goals.',
    'magpage.on.l3': '<b>Social media content</b> to amplify the cause and engage a wider audience.',
    'magpage.on.l4': '<b>Digital PR campaigns</b> to raise awareness and spark meaningful conversations.',
    'magpage.ese.sub': '100% of profits supporting our mission.',
    'magpage.ese.p1': 'Esemplare, a brand devoted to sustainability and ethical innovation, donates 100% of its profits to support Bella Esperanza’s mission. This partnership unites ethical fashion with impactful social change, combining creativity and purpose.',
    'magpage.ese.p2': 'The collaboration goes beyond donations: it includes special projects, ambassador and influencer activations, and workshops. Together we are creating opportunities rooted in shared values — sustainability, education and community building.',
    'magpage.mg.sub': 'Where luxury design meets humanitarian causes.',
    'magpage.mg.p1': 'Mark Giusti, renowned for combining craftsmanship, sustainability and mosaic art, partners with Bella Esperanza to strengthen the organisation’s mission. Together we have launched a series of meaningful initiatives, including fundraising events and awareness campaigns.',
    'magpage.mg.p2': 'This partnership underlines a shared commitment to creating opportunities for underserved communities, while celebrating the art and ethical values at the heart of the brand.',
    'magpage.isl.sub': 'A celebration of creativity and connection.',
    'magpage.isl.p1': 'The Island Experience Festival brings extraordinary creative minds together for an unforgettable journey. With a blend of electronic music, restorative yoga sessions, boat parties and much more, the festival is a vibrant showcase of art, music and community.',
    'magpage.isl.p2': 'We were proud to be charity partner of this event, joining forces to turn shared experiences into meaningful impact.',
    'magpage.kult.sub': 'Women in the Industry, at Milan’s iconic Apollo Club.',
    'magpage.kult.p1': 'Bella Esperanza was proud to be charity partner of Women in the Industry, an empowerment event organised by Kult Magazine during Milan Music Week.',
    'magpage.kult.p2': 'This gathering celebrated the achievements of women shaping the music industry while fostering dialogue on inclusion, creativity and innovation. Together with Kult Magazine we joined forces to amplify voices, spark change and support a more inclusive future.',
    'magpage.jr.sub': 'Positive impact through art and community projects.',
    'magpage.jr.p1': 'We are excited about our collaboration with JR Studio and its visionary CEO, Jeoffrey Romano. Known for its cutting-edge approach, JR Studio fully shares Bella Esperanza’s mission of generating positive impact through art and community projects.',
    'magpage.jr.p2': 'Together we will create dynamic experiences that amplify our cause and bring our vision to life.',
    'magpage.ctaTitle': 'The next project could be yours.',
    'magpage.ctaLede': 'We work with brands and companies to create tailor-made projects aligned with your goals and values — for you, or with you, on our next trip to Tanzania.'
  };

  /* ---------------------------------------------------------------------
     Machinery
     --------------------------------------------------------------------- */
  var STORAGE_KEY = 'be-lang';

  /* Which HTML attribute each `data-i18n-*` suffix writes to. */
  var ATTR_TARGETS = {
    placeholder: { type: 'attr',    name: 'placeholder' },
    aria:        { type: 'attr',    name: 'aria-label'  },
    title:       { type: 'attr',    name: 'title'       },
    idle:        { type: 'dataset', name: 'idle'        },
    done:        { type: 'dataset', name: 'done'        },
    success:     { type: 'dataset', name: 'success'     }
  };

  function cacheOriginals(el) {
    if (el.dataset.i18nCached) return;
    el.dataset.i18nCached = '1';
    if (el.hasAttribute('data-i18n')) el._itHTML = el.innerHTML;
    Object.keys(ATTR_TARGETS).forEach(function (suffix) {
      if (!el.hasAttribute('data-i18n-' + suffix)) return;
      var t = ATTR_TARGETS[suffix];
      el._itAttrs = el._itAttrs || {};
      el._itAttrs[suffix] = t.type === 'attr' ? el.getAttribute(t.name) : el.dataset[t.name];
    });
  }

  function applyLang(lang) {
    var toEnglish = lang === 'en';

    document.querySelectorAll('[data-i18n], [data-i18n-placeholder], [data-i18n-aria], [data-i18n-title], [data-i18n-idle], [data-i18n-done], [data-i18n-success]')
      .forEach(function (el) {
        cacheOriginals(el);

        if (el.hasAttribute('data-i18n')) {
          var key = el.getAttribute('data-i18n');
          if (toEnglish) {
            if (EN[key] != null) el.innerHTML = EN[key];
          } else if (el._itHTML != null) {
            el.innerHTML = el._itHTML;
          }
        }

        Object.keys(ATTR_TARGETS).forEach(function (suffix) {
          var attrKey = el.getAttribute('data-i18n-' + suffix);
          if (!attrKey) return;
          var t = ATTR_TARGETS[suffix];
          var value = toEnglish
            ? (EN[attrKey] != null ? EN[attrKey] : null)
            : (el._itAttrs ? el._itAttrs[suffix] : null);
          if (value == null) return;
          if (t.type === 'attr') el.setAttribute(t.name, value);
          else el.dataset[t.name] = value;
        });
      });

    /* Copy buttons show their idle label — refresh it after a swap. */
    document.querySelectorAll('.copy-label').forEach(function (label) {
      if (!label.closest('.is-done') && label.dataset.idle) {
        label.textContent = label.dataset.idle;
      }
    });

    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  /* --- initial language: ?lang= → saved choice → Italian ----------------
     Italian is the canonical content, so it stays the default. Visitors keep
     whichever language they pick, and ?lang=en gives a shareable EN link. */
  function initialLang() {
    var fromUrl = new URLSearchParams(location.search).get('lang');
    if (fromUrl === 'en' || fromUrl === 'it') return fromUrl;
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'it') return saved;
    } catch (e) {}
    return 'it';
  }

  var start = initialLang();
  if (start !== 'it') applyLang(start);

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-lang]');
    if (!btn) return;
    applyLang(btn.dataset.lang);
  });
})();
