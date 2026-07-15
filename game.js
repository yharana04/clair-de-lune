// ============================================
// JEU : PHRASES & BOUCLE PRINCIPALE
// ============================================
const PHRASES_DEBUT = [
    "Le village s'endort, ignorant les dangers qui rôdent dans l'ombre...",
    "La lune se lève sur Thiercelieux. Le silence envahit les rues...",
    "Les habitants ferment leurs volets. La nuit promet d'être longue...",
    "Un vent froid traverse le village. Les loups affûtent leurs crocs...",
    "Les dernières lumières s'éteignent. Quelque chose rôde dans l'obscurité...",
    "Le village s'apprête à vivre sa première nuit de terreur...",
    "Les villageois se couchent, loin de se douter de ce qui les attend...",
    "Sous le clair de lune, les masques tombent dans l'ombre...",
    "Une brume étrange enveloppe Thiercelieux. La nuit commence...",
    "Les portes se verrouillent une à une. Mais cela suffira-t-il ?"
];
const PHRASES_ROLES = {
    'cupidon': ["Cupidon ouvre les yeux et bande son arc doré...", "Un souffle léger traverse le village. L'amour va frapper deux cœurs...", "Cupidon scrute la foule endormie, prêt à unir deux destins..."],
    'enfant-sauvage': ["Un enfant aux yeux sauvages observe le village, cherchant un modèle à suivre...", "L'Enfant Sauvage choisit en secret celui qu'il admirera désormais...", "Caché dans l'ombre, l'Enfant Sauvage désigne son protecteur..."],
    'deux-soeurs': ["Deux sœurs entrouvrent les yeux et se reconnaissent dans la pénombre...", "Un lien silencieux unit les deux sœurs cette nuit...", "Les deux sœurs échangent un regard complice dans le noir..."],
    'trois-freres': ["Trois frères se reconnaissent silencieusement dans l'obscurité...", "Un lien fraternel unit les trois frères cette nuit...", "Les trois frères échangent un regard complice..."],
    'loup-garou': ["Des grognements sourds résonnent dans la forêt voisine...", "Les Loups-Garous se réveillent, la faim au ventre...", "Des silhouettes griffues se faufilent entre les maisons...", "Les yeux jaunes des loups s'ouvrent dans le noir..."],
    'voyante': ["La Voyante entrouvre les yeux, sa boule de cristal scintille...", "Un voile se lève sur l'esprit de la Voyante...", "La Voyante murmure une incantation et se concentre sur un visage..."],
    'sorciere': ["La Sorcière se réveille et observe ses deux fioles...", "Un chaudron frémit doucement dans la chaumière de la Sorcière...", "La Sorcière ouvre les yeux, ses potions à portée de main..."],
    'salvateur': ["Le Salvateur se lève en silence, prêt à veiller sur le village...", "Une ombre protectrice se déplace discrètement dans les rues...", "Le Salvateur choisit qui il protégera cette nuit..."],
    'renard': ["Le Renard renifle l'air, à la recherche d'une odeur suspecte...", "Une truffe frémit dans l'obscurité. Le Renard est en chasse...", "Le Renard ouvre un œil, prêt à flairer le danger..."],
    'ours': ["Quelque chose grogne au loin... Le Montreur d'Ours tend l'oreille...", "L'ours s'agite dans son enclos, sentant une présence hostile...", "Un grondement sourd résonne près du Montreur d'Ours..."],
    'grand-mechant-loup': ["Le Grand Méchant Loup montre les crocs, encore affamé...", "Une seconde ombre lupine se dessine dans la nuit...", "Le Grand Méchant Loup n'a pas fini de chasser ce soir..."],
    'infect-pere': ["L'Infect Père des Loups exhale une odeur putride...", "Une malédiction ancienne s'éveille avec l'Infect Père des Loups...", "L'Infect Père des Loups prépare sa morsure contaminante..."],
    'loup-blanc': ["Sous la pleine lune, le Loup Blanc se réveille seul...", "Une silhouette pâle se détache de la meute, traîtresse...", "Le Loup Blanc ouvre les yeux, prêt à trahir les siens..."],
    'loup-fou': ["Le Loup Fou entrouvre un œil dans l'obscurité, imprévisible...", "Une pensée sauvage traverse l'esprit du Loup Fou...", "Le Loup Fou agit dans l'ombre, selon ses propres règles..."],
    'joueur-flute': ["Une mélodie envoûtante commence à résonner doucement...", "Le Joueur de Flûte porte l'instrument à ses lèvres...", "Des notes hypnotiques flottent dans l'air nocturne..."],
    'voleur': ["Le Voleur se faufile dans l'ombre, prêt à dérober une identité...", "Une silhouette furtive échange discrètement quelque chose...", "Le Voleur observe le village, choisissant sa prochaine victime..."],
    'sectaire': ["Un murmure étrange se propage dans le village endormi...", "Le Sectaire chuchote une promesse à l'oreille d'un dormeur...", "Une ombre encapuchonnée recrute en silence..."],
    'pyromane': ["Une odeur d'essence flotte dans l'air nocturne...", "Le Pyromane sourit, allumette à la main...", "Des bidons vides traînent près des maisons du village..."],
    'loup-fetiche': ["Le Loup Fétiche veille sur ses frères de meute...", "Une ombre protectrice se faufile entre les loups...", "Le Loup Fétiche choisit qui il protégera cette nuit..."],
    'loup-voyou': ["Le Loup Voyou repère sa proie la plus faible...", "Un grognement sourd vise les villageois sans défense...", "Le Loup Voyou s'éloigne de la meute pour chasser seul..."],
    'pretre': ["Le Prêtre joint les mains et murmure une bénédiction...", "Une lueur sacrée enveloppe deux silhouettes endormies...", "Le Prêtre observe le couple naissant, prêt à le protéger..."],
    'amant-delaisse': ["Un cœur brisé bat dans l'ombre, épiant les Amoureux...", "L'Amant Délaissé observe en silence, rongé par la jalousie...", "Une silhouette solitaire contemple un amour qui n'est pas le sien..."]
};

function phraseAleatoire(roleId) {
    const phrases = PHRASES_ROLES[roleId];
    if (!phrases) return '';
    return phrases[Math.floor(Math.random() * phrases.length)];
}

function construireOrdreReveil() {
    const ordre = [];
    const estRoleVivant = (idRole) => etat.joueursVivants.some(nom => {
        const role = etat.rolesAttribues[etat.joueurs.indexOf(nom)];
        return role && role.id === idRole;
    });

    // Si l'Ancien a été voté par le village, les pouvoirs du village sont perdus
    const pouvairsActifs = !etat.pouvairsVillagePerdu;

    if (etat.tour === 1 && estRoleVivant('cupidon')) ordre.push('cupidon');
    if (etat.tour === 1 && estRoleVivant('pretre')) ordre.push('pretre');
    if (etat.tour === 1 && estRoleVivant('amant-delaisse')) ordre.push('amant-delaisse');
    if (etat.tour === 1 && estRoleVivant('enfant-sauvage')) ordre.push('enfant-sauvage');
    if (etat.tour === 1 && estRoleVivant('deux-soeurs')) ordre.push('deux-soeurs');
    if (etat.tour === 1 && estRoleVivant('trois-freres')) ordre.push('trois-freres');
    if (etat.tour === 1 && estRoleVivant('voleur') && !etat.voleurAJoue) ordre.push('voleur');
    if (pouvairsActifs && estRoleVivant('salvateur')) ordre.push('salvateur');
    if (estRoleVivant('loup-garou') || estRoleVivant('grand-mechant-loup') || estRoleVivant('infect-pere') || estRoleVivant('loup-blanc') || estRoleVivant('loup-alpha') || estRoleVivant('loup-fetiche') || estRoleVivant('loup-voyou') || estRoleVivant('chien-loup')) ordre.push('loup-garou');
    if (estRoleVivant('grand-mechant-loup')) ordre.push('grand-mechant-loup');
    if (estRoleVivant('infect-pere')) ordre.push('infect-pere');
    if (estRoleVivant('loup-blanc') && etat.tour % 2 === 0) ordre.push('loup-blanc');
    if (estRoleVivant('loup-fou')) ordre.push('loup-fou');
    if (estRoleVivant('loup-fetiche')) ordre.push('loup-fetiche');
    if (estRoleVivant('loup-voyou')) ordre.push('loup-voyou');
    if (pouvairsActifs && estRoleVivant('voyante')) ordre.push('voyante');
    if (pouvairsActifs && estRoleVivant('renard') && etat.renardActif !== false) ordre.push('renard');
    if (pouvairsActifs && estRoleVivant('ours')) ordre.push('ours');
    if (pouvairsActifs && estRoleVivant('enqueteur')) ordre.push('enqueteur');
    if (pouvairsActifs && estRoleVivant('detective')) ordre.push('detective');
    if (pouvairsActifs && estRoleVivant('corbeau')) ordre.push('corbeau');
    if (pouvairsActifs && estRoleVivant('garde-champetre')) ordre.push('garde-champetre');
    if (pouvairsActifs && estRoleVivant('sorciere')) ordre.push('sorciere');
    if (pouvairsActifs && estRoleVivant('sorciere-salem')) ordre.push('sorciere-salem');
    if (estRoleVivant('joueur-flute')) ordre.push('joueur-flute');
    if (estRoleVivant('sectaire')) ordre.push('sectaire');
    if (estRoleVivant('pyromane')) ordre.push('pyromane');
    return ordre;
}

function demarrerJeu() {
    const nomComedien = etat.joueurs.find(n => {
        const role = etat.rolesAttribues[etat.joueurs.indexOf(n)];
        return role && role.id === 'comedien';
    });
    if (nomComedien) {
        const candidats = etat.joueurs.filter(n => n !== nomComedien);
        const candidatsValides = candidats.filter(n => {
            const role = etat.rolesAttribues[etat.joueurs.indexOf(n)];
            return role && !role.id.includes('loup');
        });
        if (candidatsValides.length > 0) {
            const indexAleatoire = Math.floor(Math.random() * candidatsValides.length);
            const nomOriginal = candidatsValides[indexAleatoire];
            etat.originalDuComedien = nomOriginal;
            etat.nomComedien = nomComedien;
            etat.comedienEstProtege = true;
            const ecranTirage = document.getElementById('ecran-tirage-original');
            const tirageNom = document.getElementById('tirage-nom');
            if (ecranTirage && tirageNom) {
                tirageNom.textContent = nomOriginal;
                ecranTirage.style.display = 'flex';
            } else { lancerJeuReel(); }
            return;
        } else {
            alert("⚠️ Impossible de choisir un Original : aucun villageois valide disponible !");
            etat.originalDuComedien = null; etat.nomComedien = null; etat.comedienEstProtege = false;
        }
    }
    lancerJeuReel();
}

function fermerTirageEtLancerJeu() {
    const ecranTirage = document.getElementById('ecran-tirage-original');
    if (ecranTirage) ecranTirage.style.display = 'none';
    lancerJeuReel();
}

function lancerJeuReel() {
    etat.joueursVivants = [...etat.joueurs];
    etat.phase = 'nuit';
    etat.tour = 1;
    etat.modeElimination = false;
    etat.phraseDebut = PHRASES_DEBUT[Math.floor(Math.random() * PHRASES_DEBUT.length)];
    etat.introAffichee = false;
    etat.amoureux = [];
    etat.protegeCetteNuit = null; etat.protegeNuitPrecedente = null;
    etat.victimeLoups = null;
    etat.potionVieUtilisee = false; etat.potionMortUtilisee = false;
    etat.journalNuit = []; etat.timelineGlobale = [];
    etat.renardActif = true; etat.sectionJourAjoutee = false;
    etat.victimeLoupFou = null; etat.victimeGML = null; etat.victimeLoupBlanc = null;
    etat.loupEmpoisonne = null; etat.ancienAResiste = false; etat.idiotRevele = false;
    etat.modeleEnfantSauvage = null; etat.enfantSauvageNom = null; etat.enfantSauvageDevenuLoup = false;
    etat.premierVoteFait = false; etat.excluProchainVote = null; etat.joueurMaudit = null;
    etat.dernierGroupeRenard = []; etat.jugeUtilise = false; etat.jugeImpose = null;
    etat.gardeProtege = []; etat.potionVieSalem = false; etat.potionMortSalem = false; etat.potionVeriteSalem = false; etat.joueurVerite = null;
    etat.infectionUtilisee = false; etat.joueursInfectes = []; etat.ensorceles = [];
    setCompteur('Tour 1', true);
    demarrerSequenceNuit();
}

function demarrerSequenceNuit() {
    etat.ordreReveil = construireOrdreReveil();
    etat.indexReveil = 0;
    etat.victimeLoups = null; etat.protegeCetteNuit = null; etat.dernierTueurLoups = false; etat.journalNuit = [];
    ajouterSectionTimeline(`🌙 Nuit ${etat.tour}`);
    if (etat.loupEmpoisonne && etat.joueursVivants.includes(etat.loupEmpoisonne)) {
        etat.joueursVivants = etat.joueursVivants.filter(j => j !== etat.loupEmpoisonne);
        etat.journalNuit.push(`☠️ ${etat.loupEmpoisonne} succombe au poison du Chevalier.`);
        ajouterEtapeTimeline('⚔️ Poison du Chevalier', `${etat.loupEmpoisonne} a succombé.`);
        etat.loupEmpoisonne = null;
    }
    afficherEtapeNuit();
}

    // Vérification des contaminations (Infect Père des Loups)
    if (etat.joueursInfectes && etat.joueursInfectes.length > 0) {
        etat.joueursInfectes.forEach(nomContamine => {
            if (etat.joueursVivants.includes(nomContamine)) {
                const index = etat.joueurs.indexOf(nomContamine);
                if (index !== -1) {
                    const roleLoup = trouverRole('loup-garou');
                    etat.rolesAttribues[index] = roleLoup;
                    ajouterEtapeTimeline('🦠 Infection', `${nomContamine} s'est réveillé transformé en Loup-Garou !`);
                }
            }
        });
        etat.joueursInfectes = []; // On vide la liste après transformation
    }

function afficherEtapeNuit() {
    const titrePhase = document.getElementById('titre-phase');
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    if (!panneau || !joueursDiv || !actionsDiv) { console.error('Éléments DOM manquants dans ecran-jeu'); return; }
    if (titrePhase) titrePhase.textContent = '🌙 Nuit ' + etat.tour;
    setCompteur(`${etat.joueursVivants.length} vivants`);
    if (!etat.introAffichee && etat.tour === 1) {
        etat.introAffichee = true;
        afficherPanneauSimple(panneau, '🌙', 'La nuit tombe sur le village...', etat.phraseDebut);
        joueursDiv.innerHTML = ''; actionsDiv.innerHTML = `<button class="btn-action" onclick="afficherEtapeNuit()">Continuer →</button>`;
        return;
    }
    if (etat.indexReveil >= etat.ordreReveil.length) { revelerMatin(); return; }
    const roleId = etat.ordreReveil[etat.indexReveil];
    afficherActionRole(roleId, panneau, joueursDiv, actionsDiv);
}

function afficherPanneauSimple(panneau, emoji, titre, description) {
    const texteSecurise = description || "Les ombres de la nuit s'étendent sur le village...";
    panneau.innerHTML = `
        <div class="phase-nuit">
            <span class="phase-emoji">${emoji}</span>
            <div class="phase-titre">${titre}</div>
            <div class="phase-description">${texteSecurise}</div>
        </div>
    `;
}

function ajouterEtapeTimeline(titre, detail) {
    etat.timelineGlobale = etat.timelineGlobale || [];
    etat.timelineGlobale.push({ type: 'etape', titre, detail });
    afficherJournal();
}

function ajouterSectionTimeline(titreSection) {
    etat.timelineGlobale = etat.timelineGlobale || [];
    etat.timelineGlobale.push({ type: 'section', titre: titreSection, ouverte: true });
    afficherJournal();
}

function afficherTimeline() { afficherJournal(); } // compatibilité

function afficherJournal() {
    const container = document.getElementById('journal-body');
    if (!container) return;
    const items = etat.timelineGlobale || [];
    if (items.length === 0) { container.innerHTML = '<div style="color:var(--beige);font-style:italic;font-size:0.85rem;padding:0.5rem;">Aucun événement pour l\'instant.</div>'; return; }

    // Regrouper par sections
    const sections = [];
    let sectionCourante = null;
    items.forEach(item => {
        if (item.type === 'section') {
            sectionCourante = { titre: item.titre, ouverte: item.ouverte !== false, etapes: [] };
            sections.push(sectionCourante);
        } else if (sectionCourante) {
            sectionCourante.etapes.push(item);
        }
    });

    const sectionIndex = etat.timelineGlobale.filter(i => i.type === 'section').length;

    container.innerHTML = sections.map((sec, si) => {
        const estDerniereSection = si === sections.length - 1;
        const etapesHtml = sec.etapes.map((etape, ei) => {
            const estDernier = estDerniereSection && ei === sec.etapes.length - 1;
            return `
                <div class="journal-item-new ${estDernier ? 'actif' : ''}">
                    <div class="journal-item-point"></div>
                    <div class="journal-item-texte">
                        <div class="journal-item-titre">${etape.titre}</div>
                        <div class="journal-item-detail">${etape.detail}</div>
                    </div>
                </div>
            `;
        }).join('');

        const badge = sec.etapes.length > 0 ? `<span class="journal-section-badge">${sec.etapes.length} événement${sec.etapes.length > 1 ? 's' : ''}</span>` : '';

        return `
            <div class="journal-section">
                <div class="journal-section-header" onclick="toggleJournalSection(${si})">
                    <span class="journal-section-titre">${sec.titre}</span>
                    <span>
                        ${!sec.ouverte ? badge : ''}
                        <span class="journal-section-chevron ${sec.ouverte ? 'ouvert' : ''}" id="chevron-section-${si}">▼</span>
                    </span>
                </div>
                <div class="journal-section-body ${sec.ouverte ? 'ouvert' : ''}" id="section-body-${si}">
                    ${etapesHtml || '<div style="color:var(--beige);font-style:italic;font-size:0.78rem;padding:0.3rem;">Aucun événement.</div>'}
                </div>
            </div>
        `;
    }).join('');

    // Scroll vers le bas du journal pour voir le dernier événement
    container.scrollTop = container.scrollHeight;
    // Mettre à jour aussi le grimoire tablette/PC
    afficherJournalGrimoire();
}

function toggleJournal() {
    const body = document.getElementById('journal-body');
    const chevron = document.getElementById('journal-chevron');
    if (!body || !chevron) return;
    const estOuvert = body.classList.contains('ouvert');
    body.classList.toggle('ouvert', !estOuvert);
    chevron.classList.toggle('ouvert', !estOuvert);
}

function toggleJournalSection(sectionIndex) {
    // Trouver la section dans timelineGlobale
    let count = 0;
    for (let i = 0; i < etat.timelineGlobale.length; i++) {
        if (etat.timelineGlobale[i].type === 'section') {
            if (count === sectionIndex) {
                etat.timelineGlobale[i].ouverte = !etat.timelineGlobale[i].ouverte;
                break;
            }
            count++;
        }
    }
    afficherJournal();
}

function cacherJournal() {
    const j = document.getElementById('journal-partie');
    if (j) j.style.display = 'none';
}

function montrerJournal() {
    const j = document.getElementById('journal-partie');
    if (j) j.style.display = '';
}

function afficherActionRole(roleId, panneau, joueursDiv, actionsDiv) {
    const role = trouverRole(roleId);
    const phrase = phraseAleatoire(roleId);
    afficherPanneauSimple(panneau, role.emoji, role.nom, phrase);
    if (roleId === 'sorciere') { afficherActionSorciere(joueursDiv, actionsDiv); return; }
    if (roleId === 'sorciere-salem') { afficherActionSorciereSalem(joueursDiv, actionsDiv); return; }
    if (roleId === 'cupidon') { afficherActionCupidon(joueursDiv, actionsDiv); return; }
    if (roleId === 'pretre') { afficherActionPretre(joueursDiv, actionsDiv); return; }
    if (roleId === 'amant-delaisse') { afficherActionAmantDelaisse(joueursDiv, actionsDiv); return; }
    if (roleId === 'renard') { afficherActionRenard(joueursDiv, actionsDiv); return; }
    if (roleId === 'corbeau') { afficherActionCorbeau(joueursDiv, actionsDiv); return; }
    if (roleId === 'juge-corrompu') { afficherActionJugeCorrompu(joueursDiv, actionsDiv); return; }
    if (roleId === 'enqueteur') { afficherActionEnqueteur(joueursDiv, actionsDiv); return; }
    if (roleId === 'detective') { afficherActionDetective(joueursDiv, actionsDiv); return; }
    if (roleId === 'garde-champetre') { afficherActionGardeChampetre(joueursDiv, actionsDiv); return; }
    if (roleId === 'ours') { afficherActionOurs(panneau, joueursDiv, actionsDiv); return; }
    if (roleId === 'joueur-flute') { afficherActionFlute(joueursDiv, actionsDiv); return; }
    if (roleId === 'grand-mechant-loup') { afficherActionGrandMechantLoup(joueursDiv, actionsDiv); return; }
    if (roleId === 'infect-pere') { afficherActionInfectPere(joueursDiv, actionsDiv); return; }
    if (roleId === 'loup-blanc') { afficherActionLoupBlanc(joueursDiv, actionsDiv); return; }
    if (roleId === 'loup-fou') { afficherActionLoupFou(joueursDiv, actionsDiv); return; }
    if (roleId === 'loup-fetiche') { afficherActionLoupFetiche(joueursDiv, actionsDiv); return; }
    if (roleId === 'loup-voyou') { afficherActionLoupVoyou(joueursDiv, actionsDiv); return; }
    if (roleId === 'enfant-sauvage') { afficherActionEnfantSauvage(joueursDiv, actionsDiv); return; }
    if (roleId === 'deux-soeurs') { afficherActionGroupeReconnaissance('deux-soeurs', joueursDiv, actionsDiv); return; }
    if (roleId === 'trois-freres') { afficherActionGroupeReconnaissance('trois-freres', joueursDiv, actionsDiv); return; }
    if (roleId === 'voleur') { afficherActionVoleur(joueursDiv, actionsDiv); return; }
    if (roleId === 'sectaire') { afficherActionSectaire(joueursDiv, actionsDiv); return; }
    if (roleId === 'pyromane') { afficherActionPyromane(joueursDiv, actionsDiv); return; }
    joueursDiv.innerHTML = `
        <div class="info-selection">Touche un joueur :</div>
        ${etat.joueursVivants.map(nom => `
            <div class="tag-joueur" onclick="choisirCibleRole('${roleId}', '${nom.replace(/'/g, "\\'")}')">${nom}</div>
        `).join('')}
    `;
    actionsDiv.innerHTML = `<button class="btn-secondaire" onclick="etapeNuitSuivante()">Passer (aucune action)</button>`;
}

function etapeNuitSuivante() {
    etat.indexReveil++;
    afficherEtapeNuit();
}

// ============================================
// FONCTION SPÉCIFIQUE : INFECT PÈRE DES LOUPS
// ============================================
let etapeInfect = 'victime'; // 'victime' ou 'contamine'

function afficherActionInfectPere(joueursDiv, actionsDiv) {
    const panneau = document.getElementById('panneau-phase');
    const phrase = phraseAleatoire('infect-pere');
    afficherPanneauSimple(panneau, '🐺', 'Infect Père des Loups', phrase);

    if (etat.infectionUtilisee) {
        // Pouvoir déjà utilisé : il se comporte comme un loup normal cette nuit
        joueursDiv.innerHTML = `<div class="info-selection">L'Infect a déjà utilisé son pouvoir.</div>`;
        actionsDiv.innerHTML = `<button class="btn-secondaire" onclick="etapeNuitSuivante()">Continuer</button>`;
        return;
    }

    etapeInfect = 'victime';
    joueursDiv.innerHTML = `
        <div class="info-selection">Étape 1 : Choisis la VICTIME que les Loups dévorent cette nuit (elle meurt) :</div>
        ${etat.joueursVivants.map(nom => `
            <div class="tag-joueur" onclick="infectChoixVictime('${nom.replace(/'/g, "\\'")}')">${nom}</div>
        `).join('')}
    `;
    actionsDiv.innerHTML = `<button class="btn-secondaire" onclick="etapeNuitSuivante()">Passer (ne pas utiliser le pouvoir)</button>`;
}

function infectChoixVictime(nom) {
    etat.victimeLoups = nom;
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');

    afficherPanneauSimple(panneau, '🐺💀', 'Victime désignée', `${nom} sera dévoré(e) cette nuit.`);

    // Étape 2 : Choix de la personne à contaminer
    const ciblesContamination = etat.joueursVivants.filter(n => n !== nom);
    
    if (ciblesContamination.length === 0) {
        joueursDiv.innerHTML = `<div class="info-selection">Aucune autre personne vivante à contaminer.</div>`;
        actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer</button>`;
        return;
    }

    joueursDiv.innerHTML = `
        <div class="info-selection">Étape 2 : Choisis la personne à CONTAMINER (elle deviendra Loup demain) :</div>
        ${ciblesContamination.map(nom => `
            <div class="tag-joueur" onclick="infectChoixContamine('${nom.replace(/'/g, "\\'")}')">${nom}</div>
        `).join('')}
    `;
    actionsDiv.innerHTML = `<button class="btn-secondaire" onclick="etapeNuitSuivante()">Passer (ne pas contaminer)</button>`;
}

function infectChoixContamine(nom) {
    etat.infectionUtilisee = true;
    etat.joueursInfectes.push(nom); // Marqueur pour devenir loup la nuit suivante

    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');

    afficherPanneauSimple(panneau, '🐺🦠', 'Contamination réussie', `${nom} a été contaminé(e). Il/elle se réveillera Loup-Garou la nuit prochaine.`);
    ajouterEtapeTimeline('🦠 Infect Père des Loups', `${nom} a été contaminé(e) en secret.`);
    
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Terminer le tour de l'Infect</button>`;
}

// ============================================
// FONCTIONS UTILITAIRES
// ============================================
function estVivantEtRole(nom, idsRoles) {
    const role = etat.rolesAttribues[etat.joueurs.indexOf(nom)];
    return role && idsRoles.includes(role.id);
}

function verifierEnfantSauvage(morts) {
    if (!etat.modeleEnfantSauvage) return;
    if (morts.includes(etat.modeleEnfantSauvage) && etat.joueursVivants.includes(etat.enfantSauvageNom)) {
        ajouterEtapeTimeline('🌿 Enfant Sauvage', 'Son modèle est mort — il devient Loup-Garou !');
        etat.enfantSauvageDevenuLoup = true;
    }
}

// ============================================
// RÉVÉLATION DU MATIN
// ============================================
function revelerMatin() {
    const morts = [];
    const original = etat.originalDuComedien;
    const comedien = etat.nomComedien;

    // Attaque des Loups (avec immunité Comédien)
    if (etat.victimeLoups && etat.joueursVivants.includes(etat.victimeLoups)) {
        if (etat.victimeLoups === comedien && etat.joueursVivants.includes(original) && etat.comedienEstProtege) {
            etat.victimeLoups = null;
            ajouterEtapeTimeline('🎭 Comédien', `A été attaqué mais l'Original est en vie !`);
        } else {
            const estAncienProtege = estVivantEtRole(etat.victimeLoups, ['ancien']) && !etat.ancienAResiste;
            if (estAncienProtege) {
                etat.ancienAResiste = true;
                ajouterEtapeTimeline('👴 Ancien', 'A résisté à l\'attaque des loups.');
            } else if (etat.victimeLoups !== etat.protegeCetteNuit) {
                // Vérifier si la victime est un loup
                const rolesLoup = ['loup-garou', 'grand-mechant-loup', 'infect-pere', 'loup-blanc', 'loup-alpha', 'loup-fetiche', 'loup-voyou', 'chien-loup'];
                const victimeEstLoup = estVivantEtRole(etat.victimeLoups, rolesLoup);
                
                etat.joueursVivants = etat.joueursVivants.filter(j => j !== etat.victimeLoups);
                morts.push(etat.victimeLoups);
                etat.dernierTueurLoups = true;
                
                // Message spécifique si un loup a été tué par les loups
                if (victimeEstLoup) {
                    ajouterEtapeTimeline('🐺💀 Loups-Garous', `${etat.victimeLoups} a été tué(e) par sa propre meute !`);
                } else {
                    ajouterEtapeTimeline('🐺 Loups-Garous', `${etat.victimeLoups} a été dévoré(e).`);
                }
            } else {
                // Victime protégée par le Salvateur
                const rolesLoup = ['loup-garou', 'grand-mechant-loup', 'infect-pere', 'loup-blanc', 'loup-alpha', 'loup-fetiche', 'loup-voyou', 'chien-loup'];
                const victimeEstLoup = estVivantEtRole(etat.victimeLoups, rolesLoup);
                if (victimeEstLoup) {
                    ajouterEtapeTimeline('🛡️ Salvateur', `A protégé ${etat.victimeLoups} d'une attaque de sa propre meute !`);
                } else {
                    ajouterEtapeTimeline('🛡️ Salvateur', `A protégé ${etat.victimeLoups} de l'attaque des loups.`);
                }
            }
        }
    }

    // Autres morts
    if (etat.victimeBonus && etat.joueursVivants.includes(etat.victimeBonus)) {
        etat.joueursVivants = etat.joueursVivants.filter(j => j !== etat.victimeBonus);
        morts.push(etat.victimeBonus);
    }
    etat.victimeBonus = null;

    if (etat.victimeGML && etat.joueursVivants.includes(etat.victimeGML)) {
        etat.joueursVivants = etat.joueursVivants.filter(j => j !== etat.victimeGML);
        morts.push(etat.victimeGML);
    }
    etat.victimeGML = null;

    if (etat.victimeLoupBlanc && etat.joueursVivants.includes(etat.victimeLoupBlanc)) {
        const estProtegeParFetiche = etat.victimeLoupBlanc === etat.loupProtegeFetiche;
        if (estProtegeParFetiche) {
            ajouterEtapeTimeline('🐺🛡️ Loup-Fétiche', `A sauvé ${etat.victimeLoupBlanc} de l'attaque du Loup Blanc !`);
        } else {
            etat.joueursVivants = etat.joueursVivants.filter(j => j !== etat.victimeLoupBlanc);
            morts.push(etat.victimeLoupBlanc);
        }
    }
    etat.victimeLoupBlanc = null;
    etat.loupProtegeFetiche = null;

    if (etat.victimeLoupFou && etat.joueursVivants.includes(etat.victimeLoupFou)) {
        etat.joueursVivants = etat.joueursVivants.filter(j => j !== etat.victimeLoupFou);
        morts.push(etat.victimeLoupFou);
    }
    etat.victimeLoupFou = null;

    if (etat.victimeLoupVoyou && etat.joueursVivants.includes(etat.victimeLoupVoyou)) {
        etat.joueursVivants = etat.joueursVivants.filter(j => j !== etat.victimeLoupVoyou);
        morts.push(etat.victimeLoupVoyou);
    }
    etat.victimeLoupVoyou = null;

    // Pyromane : applique l'incendie s'il a été déclenché cette nuit
    if (etat.feuAllume && etat.victimesIncendie && etat.victimesIncendie.length > 0) {
        etat.victimesIncendie.forEach(nom => {
            if (etat.joueursVivants.includes(nom)) {
                etat.joueursVivants = etat.joueursVivants.filter(j => j !== nom);
                morts.push(nom);
            }
        });
        etat.feuAllume = false;
        etat.victimesIncendie = [];
        etat.arroses = [];
    }

    // Amoureux (sauf si le couple a été béni par le Prêtre)
    if (etat.amoureux.length === 2 && !etat.coupleBeni) {
        const [a, b] = etat.amoureux;
        if (morts.includes(a) && etat.joueursVivants.includes(b)) {
            etat.joueursVivants = etat.joueursVivants.filter(j => j !== b);
            morts.push(b);
        } else if (morts.includes(b) && etat.joueursVivants.includes(a)) {
            etat.joueursVivants = etat.joueursVivants.filter(j => j !== a);
            morts.push(a);
        }
    }

    // Amant Délaissé : se suicide si son amour secret meurt
    if (etat.amourSecret && morts.includes(etat.amourSecret)) {
        const nomAmant = etat.joueursVivants.find(n => estVivantEtRole(n, ['amant-delaisse']));
        if (nomAmant && etat.joueursVivants.includes(nomAmant)) {
            etat.joueursVivants = etat.joueursVivants.filter(j => j !== nomAmant);
            morts.push(nomAmant);
            ajouterEtapeTimeline('💔 Amant Délaissé', `${nomAmant} se suicide de chagrin, son amour secret est mort.`);
        }
    }

    // Comédien : si Original meurt, transformation
    if (original && morts.includes(original)) {
        etat.comedienEstProtege = false;
        const roleOriginal = etat.rolesAttribues[etat.joueurs.indexOf(original)];
        const indexComedien = etat.joueurs.indexOf(comedien);
        if (indexComedien >= 0 && roleOriginal) {
            etat.rolesAttribues[indexComedien] = roleOriginal;
            ajouterEtapeTimeline('🎭 Comédien', `${comedien} récupère le rôle de ${roleOriginal.emoji} ${roleOriginal.nom} !`);
        }
    }

    // Potion de Vérité (Sorcière de Salem)
    if (etat.joueurVerite && etat.joueursVivants.includes(etat.joueurVerite)) {
        const roleVerite = etat.rolesAttribues[etat.joueurs.indexOf(etat.joueurVerite)];
        ajouterEtapeTimeline('🧙‍♀️ Vérité', `${etat.joueurVerite} doit révéler sa carte : ${roleVerite ? roleVerite.emoji + ' ' + roleVerite.nom : '?'}`);
        etat.joueurVerite = null;
    }

    verifierEnfantSauvage(morts);
    verifierPiegeRenard(morts);

    etat.phase = 'jour';
    etat.mortsEnAttente = [...morts];
    etat.mortsAffichees = [];
    etat.contexteMort = 'nuit';
    etat.mortsNuitPourTimeline = [...morts];
    traiterProchainMort();
}

// ============================================
// FILE D'ATTENTE DES MORTS
// ============================================
function traiterProchainMort() {
    const morts = etat.mortsEnAttente || [];
    if (morts.length === 0) { afficherPhaseJour(etat.mortsAffichees || []); return; }
    const nom = morts.shift();
    etat.mortsAffichees = etat.mortsAffichees || [];
    etat.mortsAffichees.push(nom);
    const role = etat.rolesAttribues[etat.joueurs.indexOf(nom)];
    if (role && role.id === 'chasseur') { afficherActionChasseur(nom); return; }
    if (role && role.id === 'chevalier' && etat.contexteMort === 'nuit' && etat.dernierTueurLoups) { afficherActionChevalier(nom); return; }
    traiterProchainMort();
}

// ============================================
// CHASSEUR
// ============================================
function afficherActionChasseur(nomChasseur) {
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    const titrePhase = document.getElementById('titre-phase');
    if (titrePhase) titrePhase.textContent = '🏹 Le Chasseur tire !';
    afficherPanneauSimple(panneau, '🏹', `${nomChasseur} était le Chasseur`, 'En mourant, il peut emmener quelqu\'un avec lui.');
    joueursDiv.innerHTML = `
        <div class="info-selection">Touche la cible du Chasseur :</div>
        ${etat.joueursVivants.map(n => `<div class="tag-joueur" onclick="chasseurTire('${n.replace(/'/g, "\\'")}')">${n}</div>`).join('')}
    `;
    actionsDiv.innerHTML = `<button class="btn-secondaire" onclick="chasseurNeTirePas()">Le Chasseur ne tire sur personne</button>`;
}

function chasseurTire(nom) {
    etat.joueursVivants = etat.joueursVivants.filter(j => j !== nom);
    etat.mortsAffichees = etat.mortsAffichees || [];
    etat.mortsAffichees.push(nom);
    etat.mortsNuitPourTimeline = etat.mortsNuitPourTimeline || [];
    etat.mortsNuitPourTimeline.push(nom);
    verifierEnfantSauvage([nom]);
    if (etat.amoureux.includes(nom)) {
        const autre = etat.amoureux.find(n => n !== nom);
        if (autre && etat.joueursVivants.includes(autre)) {
            etat.joueursVivants = etat.joueursVivants.filter(j => j !== autre);
            etat.mortsAffichees.push(autre);
            etat.mortsNuitPourTimeline.push(autre);
        }
    }
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    afficherPanneauSimple(panneau, '🏹', 'Tir fatal', `${nom} a été emporté(e) par le Chasseur.`);
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="traiterProchainMort()">Continuer →</button>`;
}

function chasseurNeTirePas() { traiterProchainMort(); }

// ============================================
// CHEVALIER
// ============================================
function afficherActionChevalier(nomChevalier) {
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    const titrePhase = document.getElementById('titre-phase');
    if (titrePhase) titrePhase.textContent = '⚔️ Épée Rouillée';
    afficherPanneauSimple(panneau, '⚔️', `${nomChevalier} était le Chevalier`, 'Le loup qui l\'a mangé va être empoisonné. Le MJ désigne lequel.');
    const loupsVivants = etat.joueursVivants.filter(n => estVivantEtRole(n, ['loup-garou', 'grand-mechant-loup', 'infect-pere', 'loup-fou']));
    if (loupsVivants.length === 0) {
        joueursDiv.innerHTML = `<div class="info-selection">Aucun loup vivant à empoisonner.</div>`;
        actionsDiv.innerHTML = `<button class="btn-action" onclick="traiterProchainMort()">Continuer →</button>`;
        return;
    }
    joueursDiv.innerHTML = `
        <div class="info-selection">Touche le loup voisin (à gauche) du Chevalier :</div>
        ${loupsVivants.map(n => `<div class="tag-joueur" onclick="chevalierEmpoisonne('${n.replace(/'/g, "\\'")}')">${n}</div>`).join('')}
    `;
    actionsDiv.innerHTML = `<button class="btn-secondaire" onclick="traiterProchainMort()">Pas de loup adjacent</button>`;
}

function chevalierEmpoisonne(nom) {
    etat.loupEmpoisonne = nom;
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    afficherPanneauSimple(panneau, '⚔️', 'Poison inoculé', `${nom} mourra empoisonné la nuit prochaine.`);
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="traiterProchainMort()">Continuer →</button>`;
}

// ============================================
// PHASE JOUR
// ============================================
function afficherPhaseJour(morts) {
    const titrePhase = document.getElementById('titre-phase');
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');

    // CHIEN-LOUP : choix automatique au Jour 2 (une seule fois)
    if (etat.tour === 2 && !etat.chienLoupChoixFait) {
        const nomChienLoup = etat.joueursVivants.find(n => estVivantEtRole(n, ['chien-loup']));
        if (nomChienLoup) {
            etat.chienLoupChoixFait = true;
            afficherChoixChienLoup(nomChienLoup);
            return;
        }
        etat.chienLoupChoixFait = true;
    }

    if (titrePhase) titrePhase.textContent = '☀️ Jour ' + etat.tour;
    setCompteur(`${etat.joueursVivants.length} vivants`);

    if (!etat.sectionJourAjoutee) {
        etat.sectionJourAjoutee = true;
        ajouterSectionTimeline(`☀️ Jour ${etat.tour}`);
        const mortsNuit = etat.mortsNuitPourTimeline || [];
        if (mortsNuit.length > 0) {
            mortsNuit.forEach(nom => {
                const role = etat.rolesAttribues[etat.joueurs.indexOf(nom)];
                ajouterEtapeTimeline('💀 Mort dans la nuit', `${nom} — rôle : ${role ? role.emoji + ' ' + role.nom : '?'}.`);
            });
        } else {
            ajouterEtapeTimeline('✅ Nuit calme', 'Personne n\'est mort cette nuit.');
        }
        etat.mortsNuitPourTimeline = [];
    }

    panneau.innerHTML = `
        <div class="phase-jour">
            <span class="phase-emoji">☀️</span>
            <div class="phase-titre">Le village se réveille...</div>
        </div>
    `;
    joueursDiv.innerHTML = `
        <div style="width:100%; color:var(--or); font-family:'Cinzel',serif; font-size:0.85rem; margin-bottom:0.5rem;">Joueurs vivants :</div>
        ${etat.joueursVivants.map(nom => `<div class="tag-joueur">${nom}</div>`).join('')}
    `;

    actionsDiv.innerHTML = `
        <button class="btn-action danger" onclick="eliminerJoueur()">🗳️ Éliminer un joueur (vote)</button>
        <button class="btn-action" onclick="passerALaNuit()">🌙 Passer à la Nuit</button>
    `;
}

function passerALaNuit() {
    const message = vainqueurDetecte();
    if (message) { afficherEcranVictoire(message); return; }
    etat.phase = 'nuit';
    etat.tour++;
    etat.protegeNuitPrecedente = etat.protegeCetteNuit;
    etat.sectionJourAjoutee = false;
    etat.joueurMaudit = null;
    etat.gardeProtege = [];
    etat.jugeImpose = null;
    demarrerSequenceNuit();
}

function afficherEcranVictoire(message) {
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    const titrePhase = document.getElementById('titre-phase');
    if (titrePhase) titrePhase.textContent = '🏆 Partie terminée';
    afficherPanneauSimple(panneau, '🏆', 'Fin de la partie', message);
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-principal" onclick="allerVers('ecran-accueil')">🌙 Nouvelle Partie</button>`;
}

// ============================================
// VOTE DU JOUR
// ============================================
function eliminerJoueur() {
    etat.modeElimination = true;
    etat.choixVoteTemp = null;
    afficherChoixVote();
}

function afficherChoixVote() {
    const joueursDiv = document.getElementById('joueurs-vivants');
    joueursDiv.innerHTML = `
        <div style="width:100%; color:var(--or); font-family:'Cinzel',serif; font-size:0.85rem; margin-bottom:0.5rem;">💀 Touche le joueur à éliminer :</div>
        ${etat.joueursVivants.map(nom => {
            return `<div class="tag-joueur tag-elimination ${nom === etat.choixVoteTemp ? 'selectionne-cible' : ''}"
                onclick="selectionnerVote('${nom.replace(/'/g, "\\'")}')">
                ${nom}
            </div>`;
        }).join('')}
    `;
    let boutons = `<button class="btn-secondaire" onclick="annulerElimination()">Annuler</button>`;
    if (etat.choixVoteTemp) boutons = `<button class="btn-action danger" onclick="validerVote()">Continuer →</button>` + boutons;
    document.getElementById('actions-jeu').innerHTML = boutons;
}

function selectionnerVote(nom) { etat.choixVoteTemp = nom; afficherChoixVote(); }

function validerVote() {
    if (!etat.choixVoteTemp) return;
    confirmerElimination(etat.choixVoteTemp);
}

function confirmerElimination(nom) {
    etat.choixVoteTemp = null;
    const role = etat.rolesAttribues[etat.joueurs.indexOf(nom)];

    // BOUC : gagne s'il est éliminé par vote
    if (role && role.id === 'bouc') {
        afficherEcranVictoire('🐐 Le Bouc-Émissaire a gagné ! Il a été éliminé par le vote du village !');
        return;
    }

    // ANGE : gagne si éliminé au Jour 1
    if (role && role.id === 'ange' && etat.tour === 1 && !etat.premierVoteFait) {
        etat.premierVoteFait = true;
        afficherEcranVictoire('😇 L\'Ange a gagné ! Il a été éliminé lors du premier vote !');
        return;
    }
    etat.premierVoteFait = true;

    // IDIOT : révélé mais survit (une fois)
    if (role && role.id === 'idiot' && !etat.idiotRevele) {
        etat.idiotRevele = true;
        ajouterEtapeTimeline('🗳️ Vote', `${nom} — ${role.emoji} ${role.nom} révélé ! Survit mais perd son vote.`);
        afficherPhaseJour([]);
        return;
    }

    // MEUNIER : éliminé sans révéler son rôle
    if (role && role.id === 'meunier') {
        etat.joueursVivants = etat.joueursVivants.filter(j => j !== nom);
        ajouterEtapeTimeline('🗳️ Vote', `${nom} a été éliminé(e). (Rôle non révélé)`);
        etat.contexteMort = 'jour';
        etat.mortsEnAttente = [nom];
        etat.mortsAffichees = [];
        traiterProchainMort();
        return;
    }

    // ANCIEN : si le village le vote, tous les pouvoirs spéciaux du village disparaissent
    if (role && role.id === 'ancien') {
        etat.pouvairsVillagePerdu = true;
        ajouterEtapeTimeline('👴 Ancien éliminé par le village', '⚠️ Tous les pouvoirs des Villageois spéciaux sont perdus !');
    }

    etat.joueursVivants = etat.joueursVivants.filter(j => j !== nom);
    const morts = [nom];
    const roleLabel = role ? `${role.emoji} ${role.nom}` : '?';
    ajouterEtapeTimeline('🗳️ Vote', `${nom} éliminé(e) — rôle : ${roleLabel}.`);

    // Amoureux (sauf si béni par le Prêtre)
    if (etat.amoureux.includes(nom) && !etat.coupleBeni) {
        const autre = etat.amoureux.find(n => n !== nom);
        if (autre && etat.joueursVivants.includes(autre)) {
            etat.joueursVivants = etat.joueursVivants.filter(j => j !== autre);
            morts.push(autre);
            const roleAutre = etat.rolesAttribues[etat.joueurs.indexOf(autre)];
            ajouterEtapeTimeline('💔 Amoureux brisé', `${autre} meurt de chagrin — rôle : ${roleAutre ? roleAutre.emoji + ' ' + roleAutre.nom : '?'}.`);
        }
    }

    // Amant Délaissé : se suicide si son amour secret meurt par vote
    if (etat.amourSecret && morts.includes(etat.amourSecret)) {
        const nomAmant = etat.joueursVivants.find(n => estVivantEtRole(n, ['amant-delaisse']));
        if (nomAmant && etat.joueursVivants.includes(nomAmant)) {
            etat.joueursVivants = etat.joueursVivants.filter(j => j !== nomAmant);
            morts.push(nomAmant);
            ajouterEtapeTimeline('💔 Amant Délaissé', `${nomAmant} se suicide de chagrin.`);
        }
    }

    verifierEnfantSauvage(morts);
    verifierPiegeRenard(morts);
    etat.dernierTueurLoups = false;
    etat.contexteMort = 'jour';
    etat.mortsEnAttente = [...morts];
    etat.mortsAffichees = [];
    traiterProchainMort();
}

function annulerElimination() { afficherPhaseJour([]); }

// ============================================
// MODALE VUE D'ENSEMBLE (ŒIL)
// ============================================
function afficherTousLesRoles() {
    const liste = document.getElementById('liste-tous-roles');
    if (!etat.rolesAttribues || etat.rolesAttribues.length === 0) {
        alert("Les rôles n'ont pas encore été distribués !");
        return;
    }
    liste.innerHTML = etat.joueurs.map((nom, i) => {
        const role = etat.rolesAttribues[i];
        const vivant = etat.joueursVivants ? etat.joueursVivants.includes(nom) : true;
        return `
            <div class="ligne-role-overview ${vivant ? '' : 'mort'}">
                <span class="overview-nom">${nom}</span>
                <span class="overview-role-container">
                    <span class="role-cache" id="role-${i}">👁️</span>
                    <span class="role-revele" id="role-revele-${i}" style="display:none;">${role ? role.emoji + ' ' + role.nom : '?'}</span>
                    <button class="btn-oeil-role" onclick="toggleRole(${i})">🔍</button>
                </span>
            </div>
        `;
    }).join('');
    document.getElementById('modale-roles').style.display = 'flex';
}

function toggleRole(index) {
    const cache = document.getElementById(`role-${index}`);
    const revele = document.getElementById(`role-revele-${index}`);
    if (cache.style.display === 'none') {
        cache.style.display = 'inline'; revele.style.display = 'none';
    } else {
        cache.style.display = 'none'; revele.style.display = 'inline';
    }
}

function fermerModaleRoles() {
    document.getElementById('modale-roles').style.display = 'none';
}

// ============================================
// CHIEN-LOUP : choix Jour 2 (Villageois ou Loup-Garou)
// ============================================
function afficherChoixChienLoup(nomChienLoup) {
    const titrePhase = document.getElementById('titre-phase');
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');

    if (titrePhase) titrePhase.textContent = '🐶🐺 Le choix du Chien-Loup';
    afficherPanneauSimple(panneau, '🐶🐺', `${nomChienLoup} doit choisir...`,
        'Le moment est venu : le Chien-Loup doit décider de son camp pour le reste de la partie. Donne-lui le téléphone en secret.');
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `
        <button class="btn-action" onclick="chienLoupChoisit('${nomChienLoup.replace(/'/g, "\\'")}', 'village')">🧑‍🌾 Rester Villageois</button>
        <button class="btn-action danger" onclick="chienLoupChoisit('${nomChienLoup.replace(/'/g, "\\'")}', 'loup')">🐺 Devenir Loup-Garou</button>
    `;
}

function chienLoupChoisit(nom, choix) {
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');

    if (choix === 'loup') {
        const indexJoueur = etat.joueurs.indexOf(nom);
        const roleLoup = trouverRole('loup-garou');
        etat.rolesAttribues[indexJoueur] = roleLoup;
        ajouterEtapeTimeline('🐶🐺 Chien-Loup', `${nom} a choisi de rejoindre les Loups-Garous !`);
        afficherPanneauSimple(panneau, '🐺', 'Transformation !', `${nom} rejoint désormais le camp des Loups-Garous.`);
    } else {
        ajouterEtapeTimeline('🐶🐺 Chien-Loup', `${nom} a choisi de rester Villageois.`);
        afficherPanneauSimple(panneau, '🧑‍🌾', 'Fidèle au village', `${nom} reste Villageois pour le reste de la partie.`);
    }

    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="afficherPhaseJour([])">Continuer →</button>`;
}

// ============================================
// JOURNAL GRIMOIRE (version tablette/PC)
// ============================================
function afficherJournalGrimoire() {
    const container = document.getElementById('grimoire-timeline');
    if (!container) return;
    const items = etat.timelineGlobale || [];
    if (items.length === 0) { container.innerHTML = ''; return; }

    // Regrouper par sections
    const sections = [];
    let sectionCourante = null;
    items.forEach(item => {
        if (item.type === 'section') {
            sectionCourante = { titre: item.titre, ouverte: item.ouverte !== false, etapes: [] };
            sections.push(sectionCourante);
        } else if (sectionCourante) {
            sectionCourante.etapes.push(item);
        }
    });

    const dernierIndex = sections.length - 1;

    container.innerHTML = sections.map((sec, si) => {
        const estDernier = si === dernierIndex;
        const estTermine = !estDernier;
        const statut = estDernier ? 'en-cours' : 'termine';
        const estNuit = sec.titre.includes('Nuit') || sec.titre.includes('🌙');
        const sousTitre = estNuit ? 'Les ombres envahissent le village...' : 'Le village se réveille au soleil...';
        const marqueurEmoji = estTermine ? '✓' : (estNuit ? '🌙' : '☀️');

        const etapesHtml = sec.etapes.map((etape, ei) => {
            const estDerniereEtape = estDernier && ei === sec.etapes.length - 1;
            const statutEtape = estTermine ? 'termine' : (estDerniereEtape ? 'en-cours' : 'termine');
            const statutLabel = statutEtape === 'en-cours' ? '▶ En cours' : '✓';
            return `
                <div class="grimoire-action ${statutEtape}">
                    <div class="grimoire-action-icone">${etape.titre.split(' ')[0]}</div>
                    <div class="grimoire-action-contenu">
                        <div class="grimoire-action-nom">${etape.titre.replace(/^[^\s]+\s/, '')}</div>
                        <div class="grimoire-action-detail">${etape.detail}</div>
                    </div>
                    <div class="grimoire-action-statut">${statutLabel}</div>
                </div>
            `;
        }).join('');

        return `
            <div class="grimoire-chapitre ${statut}">
                <div class="grimoire-chapitre-marqueur">${marqueurEmoji}</div>
                <div class="grimoire-chapitre-header" onclick="toggleGrimoireChapitre(${si})">
                    <div class="grimoire-chapitre-titre">
                        ${sec.titre}
                        <span class="grimoire-chapitre-chevron ${sec.ouverte ? 'ouvert' : ''}" id="grimoire-chev-${si}">▼</span>
                    </div>
                    <div class="grimoire-chapitre-sous-titre">${sousTitre}</div>
                </div>
                <div class="grimoire-chapitre-body ${sec.ouverte ? 'ouvert' : ''}" id="grimoire-body-${si}">
                    ${etapesHtml || '<div style="color:rgba(212,180,131,0.4);font-size:0.7rem;font-style:italic;padding:0.3rem 0.5rem;">Aucun événement.</div>'}
                </div>
            </div>
        `;
    }).join('');

    // Scroll vers le bas
    container.scrollTop = container.scrollHeight;
}

function toggleGrimoireChapitre(index) {
    let count = 0;
    for (let i = 0; i < etat.timelineGlobale.length; i++) {
        if (etat.timelineGlobale[i].type === 'section') {
            if (count === index) {
                etat.timelineGlobale[i].ouverte = !etat.timelineGlobale[i].ouverte;
                break;
            }
            count++;
        }
    }
    afficherJournalGrimoire();
}