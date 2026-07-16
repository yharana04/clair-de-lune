// ============================================
// DONNÉES : TOUS LES RÔLES
// ============================================
const ROLES = {
    loups: [
        { id: 'loup-garou', nom: 'Loup-Garou', emoji: '🐺', desc: 'Dévore un villageois chaque nuit', max: 20, image: 'images/loup-garou.jpg' },
        { id: 'grand-mechant-loup', nom: 'Grand Méchant Loup', emoji: '🐺', desc: 'Peut dévorer un 2ème villageois si aucun LG n\'est mort', max: 10, image: 'images/grand-mechant-loup.jpg' },
        { id: 'infect-pere', nom: 'Infect Père des Loups', emoji: '🐺', desc: 'Peut infecter une victime pour en faire un LG', max: 10, image: 'images/infect-pere.jpg' },
        { id: 'loup-blanc', nom: 'Loup Blanc', emoji: '🤍🐺', desc: 'Loup solitaire qui peut aussi tuer les autres loups', max: 10, image: 'images/loup-blanc.jpg' },
        { id: 'loup-fou', nom: 'Loup Fou', emoji: '🃏🐺', desc: 'LG qui se comporte comme un villageois', max: 1, image: 'images/loup-fou.jpg' },
        { id: 'loup-voyou', nom: 'Loup-Garou Voyou', emoji: '🐺🎯', desc: 'Tente de tuer un Villageois sans pouvoir chaque nuit', max: 10, image: 'images/loup-voyou.jpg' },
        { id: 'loup-alpha', nom: 'Loup-Garou Alpha', emoji: '🐺👑', desc: 'Son vote compte double lors du choix de la victime', max: 10, image: 'images/loup-alpha.jpg' },
        { id: 'loup-fetiche', nom: 'Loup-Garou Fétiche', emoji: '🐺🔮', desc: 'Protège un autre Loup-Garou contre les attaques neutres', max: 10, image: 'images/loup-fetiche.jpg' },
        { id: 'chien-loup', nom: 'Chien-Loup', emoji: '🐶🐺', desc: 'Au jour 2 ou 3, il choisit de devenir Loup ou Villageois', max: 10, image: 'images/chien-loup.jpg' },
    ],
    villageois: [
        { id: 'villageois', nom: 'Villageois', emoji: '🧑‍🌾', desc: 'Aucun pouvoir spécial', max: 20, image: 'images/villageois.jpg' },
        { id: 'voyante', nom: 'Voyante', emoji: '🔮', desc: 'Voit la carte d\'un joueur chaque nuit', max: 10, image: 'images/voyante.jpg' },
        { id: 'sorciere', nom: 'Sorcière', emoji: '🧙‍♀️', desc: '2 potions : ressusciter ou tuer', max: 10, image: 'images/sorciere.jpg' },
        { id: 'chasseur', nom: 'Chasseur', emoji: '🏹', desc: 'En mourant, élimine quelqu\'un avec lui', max: 10, image: 'images/chasseur.jpg' },
        { id: 'petite-fille', nom: 'Petite Fille', emoji: '👧', desc: 'Peut espionner les loups la nuit', max: 10, image: 'images/petite-fille.jpg' },
        { id: 'salvateur', nom: 'Salvateur', emoji: '🛡️', desc: 'Protège un joueur de l\'attaque chaque nuit', max: 20, image: 'images/salvateur.jpg' },
        { id: 'ancien', nom: 'Ancien', emoji: '👴', desc: 'Résiste à une attaque de loup', max: 10, image: 'images/ancien.jpg' },
        { id: 'idiot', nom: 'Idiot du Village', emoji: '🤪', desc: 'Révélé si voté, reste en vie mais perd son vote', max: 10, image: 'images/idiot.jpg' },
        { id: 'deux-soeurs', nom: 'Deux Sœurs', emoji: '👯‍♀️', desc: 'Se reconnaissent la nuit (par groupe de 2)', max: 10, pasGroupe: 2, image: 'images/deux-soeurs.jpg' },
        { id: 'trois-freres', nom: 'Trois Frères', emoji: '👨‍👦‍👦', desc: 'Se reconnaissent la nuit (par groupe de 3)', max: 10, pasGroupe: 3, image: 'images/trois-freres.jpg' },
        { id: 'renard', nom: 'Renard', emoji: '🦊', desc: 'Flairer un groupe de 3 pour détecter un loup', max: 10, image: 'images/renard.jpg' },
        { id: 'ours', nom: 'Montreur d\'Ours', emoji: '🐻', desc: 'L\'ours grogne si ses voisins sont des loups', max: 10, image: 'images/ours.jpg' },
        { id: 'chevalier', nom: 'Chevalier à l\'Épée Rouillée', emoji: '⚔️', desc: 'Le loup qui le mange mourra le prochain tour', max: 10, image: 'images/chevalier.jpg' },
        { id: 'enfant-sauvage', nom: 'Enfant Sauvage', emoji: '🌿', desc: 'Devient loup si son modèle meurt', max: 10, image: 'images/enfant-sauvage.jpg' },
        { id: 'villageois-villageois', nom: 'Villageois-Villageois', emoji: '✅🧑‍🌾', desc: 'Certifié villageois, peut le revendiquer', max: 10, image: 'images/villageois-villageois.jpg' },
        { id: 'comedien', nom: 'Comédien', emoji: '🎭', desc: 'L\'Original le protège. S\'il meurt, il prend son rôle', max: 10, image: 'images/comedien.jpg' },
        { id: 'corbeau', nom: 'Corbeau', emoji: '🐦‍⬛', desc: 'Maudit un joueur qui aura 2 voix contre lui au vote', max: 10, image: 'images/corbeau.jpg' },
        { id: 'juge-corrompu', nom: 'Juge Corrompu', emoji: '⚖️', desc: 'Une fois par partie, impose un candidat unique au vote', max: 10, image: 'images/juge-corrompu.jpg' },
        { id: 'meunier', nom: 'Meunier', emoji: '🌾', desc: 'S\'il est éliminé par le vote, son rôle n\'est pas révélé', max: 10, image: 'images/meunier.jpg' },
        { id: 'enqueteur', nom: 'Enquêteur', emoji: '🔍', desc: 'Chaque nuit, découvre un rôle qui n\'est pas en jeu', max: 10, image: 'images/enqueteur.jpg' },
        { id: 'sorciere-salem', nom: 'Sorcière de Salem', emoji: '🧙‍♀️🌿', desc: 'Trois potions : vie, mort et vérité', max: 10, image: 'images/sorciere-salem.jpg' },
        { id: 'detective', nom: 'Détective', emoji: '🔎', desc: 'Chaque nuit, vérifie le camp d\'un joueur (Village ou non)', max: 10, image: 'images/detective.jpg' },
        { id: 'garde-champetre', nom: 'Garde Champêtre', emoji: '🚧', desc: 'Empêche deux joueurs de voter l\'un contre l\'autre', max: 10, image: 'images/garde-champetre.jpg' },
    ],
    neutres: [
        { id: 'joueur-flute', nom: 'Joueur de Flûte', emoji: '🪈', desc: 'Ensorcelle 2 joueurs par nuit, gagne si tous ensorcelés', max: 10, image: 'images/joueur-flute.jpg' },
        { id: 'loup-solitaire', nom: 'Loup-Garou Solitaire', emoji: '🐺💀', desc: 'Gagne seul si tout le monde est mort', max: 10, image: 'images/loup-solitaire.jpg' },
        { id: 'bouc', nom: 'Bouc-Émissaire', emoji: '🐐', desc: 'Meurt si vote à égalité, choisit qui vote ensuite', max: 10, image: 'images/bouc.jpg' },
        { id: 'ange', nom: 'Ange', emoji: '😇', desc: 'Gagne s\'il est éliminé lors du premier vote', max: 10, image: 'images/ange.jpg' },
        { id: 'voleur', nom: 'Voleur', emoji: '🥷', desc: 'Chaque nuit, vole le rôle d\'un joueur', max: 10, image: 'images/voleur.jpg' },
        { id: 'sectaire', nom: 'Sectaire', emoji: '🌀', desc: 'Recrute des joueurs dans sa secte chaque nuit', max: 10, image: 'images/sectaire.jpg' },
        { id: 'pyromane', nom: 'Pyromane', emoji: '🔥', desc: 'Arrose 2 joueurs d\'essence, et peut allumer le feu une fois', max: 10, image: 'images/pyromane.jpg' },
    ],
    amoureux: [
        { id: 'cupidon', nom: 'Cupidon', emoji: '💘', desc: 'Lie deux amoureux dès le début', max: 10, image: 'images/cupidon.jpg' },
        { id: 'amant-delaisse', nom: 'Amant Délaisse', emoji: '💔', desc: 'Secrètement amoureux d\'un Amoureux. Si son aimé meurt, il se suicide', max: 10, image: 'images/amant-delaisse.jpg' },
        { id: 'pretre', nom: 'Prêtre', emoji: '⛪', desc: 'Peut bénir les Amoureux pour briser le lien de mort', max: 10, image: 'images/pretre.jpg' },
    ]
};

// ============================================
// ÉTAT DU JEU
// ============================================
let etat = {
    joueurs: [],
    rolesSelectionnes: {},
    rolesAttribues: [],
    indexAttribution: 0,
    phase: 'nuit',
    tour: 1,
    modeRoles: 'manuel',
    joueursVivants: [],
    modeElimination: false,
    phraseDebut: '',
    introAffichee: false,
    amoureux: [],
    protegeCetteNuit: null,
    protegeNuitPrecedente: null,
    victimeLoups: null,
    potionVieUtilisee: false,
    potionMortUtilisee: false,
    journalNuit: [],
    timelineGlobale: [],
    renardActif: true,
    sectionJourAjoutee: false,
    victimeLoupFou: null,
    victimeGML: null,
    victimeLoupBlanc: null,
    loupEmpoisonne: null,
    ancienAResiste: false,
    idiotRevele: false,
    modeleEnfantSauvage: null,
    enfantSauvageNom: null,
    enfantSauvageDevenuLoup: false,
    premierVoteFait: false,
    joueurMaudit: null,
    dernierGroupeRenard: [],
    originalDuComedien: null,
    nomComedien: null,
    comedienEstProtege: false,
    jugeUtilise: false,
    jugeImpose: null,
    gardeProtege: [],
    potionVieSalem: false,
    potionMortSalem: false,
    potionVeriteSalem: false,
    joueurVerite: null,
    choixSorciereTemp: null,
    choixSorciereSalemTemp: null,
    selectionRenard: [],
    selectionFlute: [],
    selectionCupidon: [],
    selectionGarde: [],
    validationEnCours: null,
    mortsEnAttente: [],
    mortsAffichees: [],
    mortsNuitPourTimeline: [],
    contexteMort: null,
    dernierTueurLoups: false,
    ordreReveil: [],
    indexReveil: 0,
    indexVerifAmoureux: 0,
    victimeBonus: null,
    joueursInfectes: [],
    infectionUtilisee: false,
    ensorceles: [],
    pouvairsVillagePerdu: false,
    chienLoupChoixFait: false,
    voleurAJoue: false,
    pretreAJoue: false,
    amantDelaisseAJoue: false,
    coupleBeni: false,
    amourSecret: null,
    membresSecte: [],
    arroses: [],
    selectionArrosage: [],
    feuAllume: false,
    victimesIncendie: [],
    loupProtegeFetiche: null,
    victimeLoupVoyou: null,
    cibleVoleur: null
};

// Copie vierge de l'état, capturée une seule fois au chargement du script,
// utilisée pour repartir sur une base propre lors d'une "Nouvelle Partie".
const ETAT_INITIAL_JSON = JSON.stringify(etat);

function reinitialiserEtat() {
    const frais = JSON.parse(ETAT_INITIAL_JSON);
    Object.keys(etat).forEach(cle => delete etat[cle]);
    Object.assign(etat, frais);
}

// ============================================
// SAUVEGARDE & REPRISE DE PARTIE (anti-refresh)
// ============================================
const CLE_SAUVEGARDE_PARTIE = 'clairdelune-partie-active';

function ecranActifId() {
    const actif = document.querySelector('.ecran.actif');
    return actif ? actif.id : 'ecran-accueil';
}

function sauvegarderPartie() {
    try {
        const ecran = ecranActifId();
        if (ecran === 'ecran-accueil') return;
        localStorage.setItem(CLE_SAUVEGARDE_PARTIE, JSON.stringify({ ecran, etat }));
    } catch (e) {
        console.warn('Impossible de sauvegarder la partie en cours.');
    }
}

function effacerPartieSauvegardee() {
    try { localStorage.removeItem(CLE_SAUVEGARDE_PARTIE); } catch (e) {}
}

function nouvellePartie() {
    reinitialiserEtat();
    effacerPartieSauvegardee();
    allerVers('ecran-joueurs');
}

function restaurerPartieSiExistante() {
    let sauvegarde;
    try {
        const data = localStorage.getItem(CLE_SAUVEGARDE_PARTIE);
        if (!data) return;
        sauvegarde = JSON.parse(data);
    } catch (e) { return; }
    if (!sauvegarde || !sauvegarde.etat || !sauvegarde.ecran) return;
    const cible = document.getElementById(sauvegarde.ecran);
    if (!cible) { effacerPartieSauvegardee(); return; }

    const reprendre = confirm('Une partie était en cours. Voulez-vous la reprendre ?');
    if (!reprendre) { effacerPartieSauvegardee(); return; }

    Object.keys(etat).forEach(cle => delete etat[cle]);
    Object.assign(etat, sauvegarde.etat);

    document.querySelectorAll('.ecran').forEach(e => e.classList.remove('actif'));
    cible.classList.add('actif');
    window.scrollTo(0, 0);

    switch (sauvegarde.ecran) {
        case 'ecran-joueurs': afficherJoueurs(); break;
        case 'ecran-roles': afficherRoles(); break;
        case 'ecran-attribution':
            if (etat.rolesAttribues && etat.rolesAttribues.length > 0) {
                afficherCarteAttribution();
            } else {
                demarrerAttribution();
            }
            break;
        case 'ecran-jeu':
            if (!etat.joueursVivants || etat.joueursVivants.length === 0) {
                // La partie n'avait pas encore réellement démarré (ex: tirage du Comédien en cours)
                demarrerJeu();
            } else {
                afficherJournal();
                if (etat.phase === 'jour') traiterProchainMort();
                else afficherEtapeNuit();
            }
            break;
    }
}

// Sauvegarde continue pendant que la partie avance (couvre toutes les
// actions de nuit/jour sans avoir à modifier chaque fonction du jeu).
setInterval(() => {
    if (ecranActifId() !== 'ecran-accueil') sauvegarderPartie();
}, 2000);

function setCompteur(texte, visible) {
    const compteur = document.getElementById('compteur-tour');
    if (!compteur) return;
    if (visible !== undefined) compteur.style.display = visible ? 'block' : 'none';
    if (texte !== undefined) compteur.textContent = texte;
}

// ============================================
// NAVIGATION
// ============================================
function allerVers(ecranId) {
    document.querySelectorAll('.ecran').forEach(e => e.classList.remove('actif'));
    document.getElementById(ecranId).classList.add('actif');
    window.scrollTo(0, 0);

    if (ecranId === 'ecran-joueurs') {
        document.getElementById('input-joueur').value = '';
        afficherJoueurs();
    }
    if (ecranId === 'ecran-roles') afficherRoles();
    if (ecranId === 'ecran-attribution') demarrerAttribution();
    if (ecranId === 'ecran-jeu') demarrerJeu();

    sauvegarderPartie();
}

// ============================================
// GESTION DES JOUEURS
// ============================================
function ajouterJoueur() {
    const input = document.getElementById('input-joueur');
    const nom = input.value.trim();
    if (!nom) return;
    if (etat.joueurs.includes(nom)) {
        alert('Ce joueur existe déjà !');
        return;
    }
    if (etat.joueurs.length >= 100) {
        alert('Maximum 100 joueurs !');
        return;
    }
    etat.joueurs.push(nom);
    sauvegarderProfil(nom);
    input.value = '';
    afficherJoueurs();
}

// ============================================
// PROFILS JOUEURS (mémorisés sur l'appareil)
// ============================================
function obtenirProfils() {
    try {
        const data = localStorage.getItem('clairdelune-profils');
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function sauvegarderProfil(nom) {
    let profils = obtenirProfils();
    profils = profils.filter(p => p !== nom);
    profils.unshift(nom);
    profils = profils.slice(0, 30);
    try {
        localStorage.setItem('clairdelune-profils', JSON.stringify(profils));
    } catch (e) {
        console.warn('Impossible de sauvegarder le profil');
    }
}

function supprimerProfil(nom) {
    let profils = obtenirProfils();
    profils = profils.filter(p => p !== nom);
    localStorage.setItem('clairdelune-profils', JSON.stringify(profils));
    afficherJoueurs();
}

function afficherProfilsRapides() {
    const container = document.getElementById('profils-rapides');
    const recherche = document.getElementById('input-joueur').value.trim().toLowerCase();
    const profils = obtenirProfils().filter(p => !etat.joueurs.includes(p) && p.toLowerCase().includes(recherche));

    if (profils.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = `
        <div class="profils-titre">👥 Joueurs précédents (clic pour ajouter)</div>
        <div class="profils-liste">
            ${profils.map(nom => `
                <span class="profil-item">
                    <button class="profil-tag" onclick="ajouterProfilRapide('${nom.replace(/'/g, "\\'")}')">
                        ${nom} +
                    </button>
                    <button class="profil-supprimer" onclick="supprimerProfil('${nom.replace(/'/g, "\\'")}')">✕</button>
                </span>
            `).join('')}
        </div>
    `;
}

function ajouterProfilRapide(nom) {
    if (etat.joueurs.includes(nom)) return;
    if (etat.joueurs.length >= 100) {
        alert('Maximum 100 joueurs !');
        return;
    }
    etat.joueurs.push(nom);
    afficherJoueurs();
}

document.getElementById('input-joueur').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') ajouterJoueur();
});
document.getElementById('input-joueur').addEventListener('input', afficherProfilsRapides);

function supprimerJoueur(index) {
    etat.joueurs.splice(index, 1);
    afficherJoueurs();
}

function afficherJoueurs() {
    const liste = document.getElementById('liste-joueurs');
    const info = document.getElementById('info-joueurs');
    const btnSuivant = document.getElementById('btn-suivant-roles');

    liste.innerHTML = etat.joueurs.map((nom, i) => `
        <div class="joueur-item">
            <span><span class="joueur-numero">${i + 1}.</span>
            <span class="joueur-nom">${nom}</span></span>
            <button class="btn-supprimer" onclick="supprimerJoueur(${i})">✕</button>
        </div>
    `).join('');

    const nb = etat.joueurs.length;
    const minimum = 4;
    if (nb === 0) {
        info.textContent = `Ajoutez au moins ${minimum} joueurs pour commencer.`;
        btnSuivant.style.display = 'none';
    } else if (nb < minimum) {
        info.textContent = `${nb} joueur(s) — il en faut au moins ${minimum}.`;
        btnSuivant.style.display = 'none';
    } else {
        info.textContent = `${nb} joueurs prêts ! 🎉`;
        btnSuivant.style.display = 'block';
    }

    afficherProfilsRapides();
}

// ============================================
// GESTION DES RÔLES
// ============================================
function afficherRoles() {
    const container = document.getElementById('categories-roles');
    const categories = [
        { key: 'loups', titre: '🐺 Loups-Garous' },
        { key: 'villageois', titre: '🧑‍🌾 Villageois' },
        { key: 'neutres', titre: '⚖️ Neutres & Solitaires' },
        { key: 'amoureux', titre: '💘 Amoureux' }
    ];

    const total = totalRolesSelectionnes();
    const nbJoueurs = etat.joueurs.length;

    container.innerHTML = categories.map(cat => `
        <div class="categorie-role" data-camp="${cat.key}">
            <div class="categorie-titre" data-camp="${cat.key}">${cat.titre}</div>
            ${ROLES[cat.key].map(role => {
                const qte = etat.rolesSelectionnes[role.id] || 0;
                const pas = role.pasGroupe || 1;
                const placeRestante = nbJoueurs - total;
                const peutAjouter = qte < role.max && placeRestante >= pas;
                return `
                <div class="role-item ${qte > 0 ? 'selectionne' : ''}" data-camp="${cat.key}">
                    <div class="role-main">
                        <div class="role-info">
                            <span class="role-emoji">${role.emoji}</span>
                            <div class="role-nom">${role.nom}</div>
                        </div>
                        <div class="role-compteur">
                            <button class="btn-moins" onclick="changerQuantiteRole('${role.id}', -1)" ${qte === 0 ? 'disabled' : ''}>−</button>
                            <span class="role-quantite">${qte}</span>
                            <button class="btn-plus" onclick="changerQuantiteRole('${role.id}', 1)" ${!peutAjouter ? 'disabled' : ''}>+</button>
                        </div>
                    </div>
                    <div class="role-desc">${role.desc}</div>
                </div>
            `}).join('')}
        </div>
    `).join('');

    mettreAJourResume();
}

function changerQuantiteRole(roleId, delta) {
    const role = trouverRole(roleId);
    const actuel = etat.rolesSelectionnes[roleId] || 0;
    const pas = role.pasGroupe || 1;
    const nouveau = Math.max(0, Math.min(role.max, actuel + (delta * pas)));
    etat.rolesSelectionnes[roleId] = nouveau;
    afficherRoles();
}

function trouverRole(roleId) {
    for (const cat of Object.values(ROLES)) {
        const role = cat.find(r => r.id === roleId);
        if (role) return role;
    }
    return null;
}

function totalRolesSelectionnes() {
    return Object.values(etat.rolesSelectionnes).reduce((a, b) => a + b, 0);
}

function mettreAJourResume() {
    const resume = document.getElementById('resume-roles');
    const btnSuivant = document.getElementById('btn-suivant-attribution');
    const total = totalRolesSelectionnes();
    const nbJoueurs = etat.joueurs.length;
    const nbLoups = compterLoups();
    const nbVillageois = total - nbLoups;

    let pourcentLoups = 0, pourcentVillage = 0;
    if (total > 0) {
        pourcentLoups = Math.round((nbLoups / total) * 100);
        pourcentVillage = 100 - pourcentLoups;
    }

    let etatEquilibre = '', classeEtat = '', suggestion = '';
    if (total === 0) {
        etatEquilibre = 'Sélectionnez des rôles'; classeEtat = 'alerte-village'; suggestion = 'Ajoutez au moins 1 loup pour commencer.';
    } else if (nbLoups === 0) {
        etatEquilibre = '⚠️ Aucun loup sélectionné'; classeEtat = 'alerte-village'; suggestion = 'Les loups sont essentiels au jeu !';
    } else if (pourcentLoups >= 25 && pourcentLoups <= 35) {
        etatEquilibre = '✅ Équilibré'; classeEtat = 'equilibre'; suggestion = 'La partie promet d\'être palpitante !';
    } else if (pourcentLoups < 25) {
        etatEquilibre = '🟡 Trop de villageois'; classeEtat = 'alerte-village'; suggestion = 'Les loups risquent d\'être trop faibles. Ajoutez-en un.';
    } else {
        etatEquilibre = '🔴 Trop de loups'; classeEtat = 'alerte-loups'; suggestion = `Le village risque d'être décimé. Enlevez un loup ou ajoutez des villageois.`;
    }

    let html = `
        <div class="resume-titre">⚖️ Équilibre de la partie</div>
        <div class="jauge-conteneur">
            <div class="jauge-ligne">
                <span class="jauge-label">🐺 Loups</span>
                <div class="jauge-barre-conteneur"><div class="jauge-barre-remplissage loup" style="width: ${pourcentLoups}%"></div></div>
                <span class="jauge-pourcentage">${pourcentLoups}%</span>
            </div>
            <div class="jauge-ligne">
                <span class="jauge-label">🧑‍🌾 Village</span>
                <div class="jauge-barre-conteneur"><div class="jauge-barre-remplissage village" style="width: ${pourcentVillage}%"></div></div>
                <span class="jauge-pourcentage">${pourcentVillage}%</span>
            </div>
        </div>
        <div class="jauge-etat ${classeEtat}">${etatEquilibre}</div>
        <div class="jauge-suggestion">💡 ${suggestion}</div>
        <div class="resume-item resume-total"><span>Rôles distribués</span><span>${total} / ${nbJoueurs}</span></div>
    `;

    if (total !== nbJoueurs) {
        html += `<div style="color:#CC6666; font-size:0.85rem; margin-top:0.5rem;">⚠️ Il faut exactement ${nbJoueurs} rôles pour ${nbJoueurs} joueurs.</div>`;
        btnSuivant.style.display = 'none';
    } else {
        btnSuivant.style.display = 'block';
    }
    resume.innerHTML = html;
}

function compterLoups() {
    let nbLoups = 0;
    for (const [id, qte] of Object.entries(etat.rolesSelectionnes)) {
        if (ROLES.loups.find(r => r.id === id) && id !== 'loup-fou') nbLoups += qte;
    }
    return nbLoups;
}

function changerMode(mode) {
    etat.modeRoles = mode;
    document.getElementById('btn-mode-manuel').classList.toggle('actif', mode === 'manuel');
    document.getElementById('btn-mode-ia').classList.toggle('actif', mode === 'ia');
    document.getElementById('panneau-manuel').style.display = mode === 'manuel' ? 'block' : 'none';
    document.getElementById('panneau-ia').style.display = mode === 'ia' ? 'block' : 'none';
    if (mode === 'ia') genererSuggestionIA();
}

function genererSuggestionIA() {
    const nb = etat.joueurs.length;
    const suggestions = document.getElementById('suggestion-ia');
    suggestions.innerHTML = '⏳ Génération en cours...';
    const config = suggestionParNombre(nb);
    etat.rolesSelectionnes = config.roles;
    let html = `<p style="color:var(--or); font-family:'Cinzel',serif; margin-bottom:0.8rem;">Suggestion pour ${nb} joueurs :</p>`;
    for (const [id, qte] of Object.entries(config.roles)) {
        if (qte > 0) {
            const role = trouverRole(id);
            html += `<div class="resume-item">${role.emoji} ${role.nom} ×${qte}</div>`;
        }
    }
    suggestions.innerHTML = html;
    afficherRoles();
    mettreAJourResume();
}

function suggestionParNombre(nb) {
    const nbLoups = Math.max(1, Math.round(nb / 3.5));
    const rolesVillageoisPossibles = ['voyante', 'sorciere', 'chasseur', 'salvateur', 'renard', 'comedien', 'corbeau', 'enqueteur', 'detective'];
    const rolesNeutresPossibles = ['joueur-flute', 'ange'];
    const rolesMelanges = [...rolesVillageoisPossibles].sort(() => Math.random() - 0.5);
    const rolesNeutresMelanges = [...rolesNeutresPossibles].sort(() => Math.random() - 0.5);

    let rolesChoisis = {};
    rolesChoisis['loup-garou'] = nbLoups;
    let total = nbLoups;

    // Toujours au moins 1 rôle spécial de village (Voyante OU autre, tiré au hasard)
    // pour garantir de la variété même à 4-6 joueurs.
    const nbRolesSpeciaux = Math.max(1, Math.min(rolesMelanges.length, nb - nbLoups - 1));
    for (let i = 0; i < nbRolesSpeciaux; i++) {
        rolesChoisis[rolesMelanges[i]] = 1;
        total++;
    }

    // À partir de 15 joueurs, on ajoute un rôle Neutre en plus
    if (nb >= 15) {
        rolesChoisis[rolesNeutresMelanges[0]] = 1;
        total++;
    }

    const reste = nb - total;
    rolesChoisis['villageois'] = Math.max(0, reste);

    return { roles: rolesChoisis };
}

// ============================================
// ATTRIBUTION DES RÔLES
// ============================================
function demarrerAttribution() {
    etat.rolesAttribues = [];
    for (const [id, qte] of Object.entries(etat.rolesSelectionnes)) {
        for (let i = 0; i < qte; i++) etat.rolesAttribues.push(trouverRole(id));
    }
    for (let i = etat.rolesAttribues.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [etat.rolesAttribues[i], etat.rolesAttribues[j]] = [etat.rolesAttribues[j], etat.rolesAttribues[i]];
    }
    etat.indexAttribution = 0;
    afficherCarteAttribution();
}

function afficherCarteAttribution() {
    const container = document.getElementById('attribution-joueur');
    const index = etat.indexAttribution;
    const joueur = etat.joueurs[index];
    const role = etat.rolesAttribues[index];
    const total = etat.joueurs.length;

    container.innerHTML = `
        <div class="carte-joueur-nom"> Tour de ${joueur}</div>
        <div class="carte-conteneur">
            <div class="carte-3d" id="carte-distribution">
                <div class="carte-face carte-dos">
                    <img src="images/dos-carte.png" alt="Dos de carte" draggable="false">
                    <div class="carte-dos-texte"> Maintiens pour révéler</div>
                </div>
                <div class="carte-face carte-avant">
                    <img src="${role.image}" alt="${role.nom}" class="carte-image" draggable="false">
                    <div class="carte-infos">
                        <div class="carte-role-nom">${role.nom}</div>
                        <div class="carte-role-desc">${role.desc}</div>
                    </div>
                </div>
            </div>
        </div>
        <div style="text-align:center; color:var(--beige); margin: 0.8rem 0;">Joueur ${index + 1} sur ${total}</div>
        <button class="btn-principal" id="btn-suivant-joueur" disabled
            onclick="${index + 1 < total ? 'joueurSuivant()' : "allerVers('ecran-jeu')"}">
            ${index + 1 < total ? 'Joueur suivant →' : '🌙 Commencer la Partie !'}
        </button>
        <div class="aide-bouton" id="aide-bouton">Maintiens ton doigt sur la carte pour révéler ton rôle</div>
    `;
    activerCarteDistribution();
}

function activerMaintienCarte(carte, onPremiereRevelation) {
    let maintient = false;
    function arretMaintien() {
        document.removeEventListener('mouseup', cacherCarte);
        document.removeEventListener('touchend', cacherCarte);
        document.removeEventListener('touchcancel', cacherCarte);
    }
    function cacherCarte() {
        if (!maintient) return;
        maintient = false;
        carte.classList.remove('retournee');
        arretMaintien();
        onPremiereRevelation?.();
    }
    function demarrerMaintien(e) {
        if (e.type === 'touchstart') e.preventDefault();
        maintient = true;
        carte.classList.add('retournee');
        document.addEventListener('mouseup', cacherCarte);
        document.addEventListener('touchend', cacherCarte);
        document.addEventListener('touchcancel', cacherCarte);
    }
    carte.addEventListener('mousedown', demarrerMaintien);
    carte.addEventListener('touchstart', demarrerMaintien, { passive: false });
    carte.addEventListener('mouseup', cacherCarte);
    carte.addEventListener('touchend', cacherCarte);
    carte.addEventListener('touchcancel', cacherCarte);
}

function activerCarteDistribution() {
    const carte = document.getElementById('carte-distribution');
    const btnSuivant = document.getElementById('btn-suivant-joueur');
    const aide = document.getElementById('aide-bouton');
    let dejaRevele = false;
    activerMaintienCarte(carte, () => {
        if (dejaRevele) return;
        dejaRevele = true;
        btnSuivant.disabled = false;
        aide.textContent = "Rôle découvert ! Tu peux passer le téléphone.";
        aide.style.color = "var(--or)";
    });
}

function joueurSuivant() {
    etat.indexAttribution++;
    afficherCarteAttribution();
}
// FIN core.js
