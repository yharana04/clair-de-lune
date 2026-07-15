// ============================================
function choisirCibleRole(roleId, nom) {
    if (roleId === 'voyante') {
        const panneau = document.getElementById('panneau-phase');
        const joueursDiv = document.getElementById('joueurs-vivants');
        const actionsDiv = document.getElementById('actions-jeu');
        const indexJoueur = etat.joueurs.indexOf(nom);
        const roleVu = etat.rolesAttribues[indexJoueur];
        panneau.innerHTML = `
            <div class="carte-joueur-nom">👤 ${nom} est...</div>
            <div class="carte-conteneur">
                <div class="carte-revelee">
                    <img src="${roleVu.image}" alt="${roleVu.nom}" class="carte-image">
                    <div class="carte-infos">
                        <div class="carte-role-nom">${roleVu.nom}</div>
                        <div class="carte-role-desc">${roleVu.desc}</div>
                    </div>
                </div>
            </div>
        `;
        joueursDiv.innerHTML = '';
        actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
        ajouterEtapeTimeline('🔮 Voyante', `A consulté ${nom}.`);
        return;
    }
    if (roleId === 'loup-garou') {
        etat.victimeLoups = nom;
        const aUnAlpha = etat.joueursVivants.some(n => estVivantEtRole(n, ['loup-alpha']));
        const texteAlpha = aUnAlpha ? ` <br><span style="color:#CC8866; font-size:0.85rem;">⚠️ Loup-Alpha présent : son vote compte double, il tranche en cas d'égalité.</span>` : '';
        const estLoup = estVivantEtRole(nom, ['loup-garou', 'grand-mechant-loup', 'infect-pere', 'loup-blanc', 'loup-alpha', 'loup-fetiche', 'loup-voyou', 'chien-loup']);
        const texteLoup = estLoup ? `<br><span style="color:#CC6666; font-size:0.85rem;">⚠️ ATTENTION : Vous avez désigné un loup ! Il mourra s'il n'est pas protégé.</span>` : '';
        afficherSelectionModifiable('loup-garou', '🐺', 'Loups-Garous', nom, (n) => `Victime désignée : <strong>${n}</strong>${texteAlpha}${texteLoup}`, validerChoixLoups);
        return;
    }
    if (roleId === 'salvateur') {
        etat.protegeCetteNuit = nom;
        afficherSelectionModifiable('salvateur', '🛡️', 'Salvateur', nom, (n) => `Protection accordée à : <strong>${n}</strong>`, validerChoixSalvateur);
        return;
    }
}

function afficherSelectionModifiable(roleId, emoji, titreRole, nomChoisi, texteFn, validerFn) {
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    etat.validationEnCours = validerFn;
    panneau.innerHTML = `
        <div class="phase-nuit">
            <span class="phase-emoji">${emoji}</span>
            <div class="phase-titre">${titreRole}</div>
            <div class="phase-description">${texteFn(nomChoisi)}</div>
        </div>
    `;
    joueursDiv.innerHTML = `
        <div class="info-selection">Touche un autre joueur pour changer le choix :</div>
        ${etat.joueursVivants.map(n => `
            <div class="tag-joueur ${n === nomChoisi ? 'selectionne-cible' : ''}" onclick="choisirCibleRole('${roleId}', '${n.replace(/'/g, "\\'")}')">${n}</div>
        `).join('')}
    `;
    actionsDiv.innerHTML = `<button class="btn-action" onclick="validerSelectionEnCours()">Continuer →</button>`;
}

function validerSelectionEnCours() {
    if (etat.validationEnCours) { etat.validationEnCours(); etat.validationEnCours = null; }
}

function validerChoixLoups() {
    ajouterEtapeTimeline('🐺 Loups-Garous', `${etat.victimeLoups} a été désigné(e).`);
    etapeNuitSuivante();
}

function validerChoixSalvateur() {
    ajouterEtapeTimeline('🛡️ Salvateur', `A protégé ${etat.protegeCetteNuit}.`);
    etapeNuitSuivante();
}

// ============================================
// CUPIDON
// ============================================
function afficherActionCupidon(joueursDiv, actionsDiv) {
    etat.selectionCupidon = etat.selectionCupidon || [];
    joueursDiv.innerHTML = `
        <div class="info-selection">Touche les 2 amoureux (${etat.selectionCupidon.length}/2) :</div>
        ${etat.joueursVivants.map(nom => `
            <div class="tag-joueur ${etat.selectionCupidon.includes(nom) ? 'selectionne-cible' : ''}" onclick="toggleCupidon('${nom.replace(/'/g, "\\'")}')">${nom}</div>
        `).join('')}
    `;
    actionsDiv.innerHTML = `
        <button class="btn-action" ${etat.selectionCupidon.length !== 2 ? 'disabled' : ''} onclick="validerCupidon()">Valider</button>
        <button class="btn-secondaire" onclick="etapeNuitSuivante()">Passer (aucune action)</button>
    `;
}

function toggleCupidon(nom) {
    etat.selectionCupidon = etat.selectionCupidon || [];
    if (etat.selectionCupidon.includes(nom)) etat.selectionCupidon = etat.selectionCupidon.filter(n => n !== nom);
    else if (etat.selectionCupidon.length < 2) etat.selectionCupidon.push(nom);
    afficherActionCupidon(document.getElementById('joueurs-vivants'), document.getElementById('actions-jeu'));
}

function validerCupidon() {
    etat.amoureux = [...etat.selectionCupidon];
    etat.selectionCupidon = [];
    ajouterEtapeTimeline('💘 Cupidon', `${etat.amoureux[0]} et ${etat.amoureux[1]} sont tombés amoureux.`);
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    cacherJournal(); // Cache le journal pendant la vérif des amoureux
    afficherPanneauSimple(panneau, '💘', 'Le village s\'agite...', 'Chacun ressent un frisson dans son sommeil. Les joueurs se réveillent un instant et vérifient discrètement leur carte.');
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="demarrerVerificationAmoureux()">Continuer →</button>`;
}

function demarrerVerificationAmoureux() {
    etat.indexVerifAmoureux = 0;
    afficherVerificationAmoureux();
}

const TEXTE_PAS_AMOUREUX = "Tu observes le village endormi autour de toi. Cette nuit, ton cœur reste calme et silencieux. Tu n'as pas d'amoureux, mais cela ne veut pas dire que tu es seul(e)... Reste vigilant(e) !";

function afficherVerificationAmoureux() {
    const index = etat.indexVerifAmoureux;
    const liste = etat.joueursVivants;
    if (index >= liste.length) {
        montrerJournal(); // Réaffiche le journal après la vérif
        etapeNuitSuivante();
        return;
    }
    const nom = liste[index];
    const estAmoureux = etat.amoureux.includes(nom);
    let texteCarte, emojiCarte;
    if (estAmoureux) {
        const autre = etat.amoureux.find(n => n !== nom);
        emojiCarte = '💘';
        texteCarte = `Ton amoureux est <strong>${autre}</strong>. Désormais ta mission a changé : reste en vie coûte que coûte avec ton amoureux, quitte à trahir ton propre camp si nécessaire.`;
    } else {
        emojiCarte = '🌙';
        texteCarte = TEXTE_PAS_AMOUREUX;
    }
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    cacherJournal(); // S'assure que le journal reste caché
    panneau.innerHTML = `
        <div class="carte-joueur-nom">👤 Tour de ${nom}</div>
        <div class="carte-conteneur">
            <div class="carte-3d" id="carte-3d-amour">
                <div class="carte-face carte-dos">
                    <img src="images/dos-carte.png" alt="Dos de carte" draggable="false">
                    <div class="carte-dos-texte">🤫 Maintiens pour révéler</div>
                </div>
                <div class="carte-face carte-avant">
                    <div class="carte-infos carte-infos-amour">
                        <span class="carte-amour-emoji">${emojiCarte}</span>
                        <div class="carte-role-desc">${texteCarte}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `
        <button class="btn-principal" id="btn-suivant-amour" disabled>Joueur suivant →</button>
        <div class="aide-bouton" id="aide-bouton-amour">Découvre d'abord avant de continuer</div>
    `;
    activerCarteAmoureux();
}

function activerCarteAmoureux() {
    const carte = document.getElementById('carte-3d-amour');
    const btnSuivant = document.getElementById('btn-suivant-amour');
    const aide = document.getElementById('aide-bouton-amour');
    let dejaRevele = false;
    activerMaintienCarte(carte, () => {
        if (dejaRevele) return;
        dejaRevele = true;
        btnSuivant.disabled = false;
        aide.style.display = 'none';
    });
    btnSuivant.addEventListener('click', () => { etat.indexVerifAmoureux++; afficherVerificationAmoureux(); });
}

// ============================================
// SORCIÈRE (Classique)
// ============================================
function afficherActionSorciere(joueursDiv, actionsDiv) {
    etat.choixSorciereTemp = { type: 'rien' };
    const victime = etat.victimeLoups;
    let html = victime ? `<div class="info-selection">🐺 Les loups ont attaqué : <strong>${victime}</strong></div>` : `<div class="info-selection">Aucune victime cette nuit.</div>`;
    joueursDiv.innerHTML = html;
    let boutons = '';
    if (victime && !etat.potionVieUtilisee) boutons += `<button class="btn-action" onclick="sorciereSauver()">🧪 Utiliser la potion de vie</button>`;
    if (!etat.potionMortUtilisee) boutons += `<button class="btn-action danger" onclick="afficherChoixPotionMort()">☠️ Utiliser la potion de mort</button>`;
    boutons += `<button class="btn-secondaire" onclick="sorciereRienFaire()">Ne rien faire</button>`;
    actionsDiv.innerHTML = boutons;
}

function sorciereSauver() {
    etat.choixSorciereTemp = { type: 'sauver' };
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    afficherPanneauSimple(panneau, '🧪', 'Potion de vie prête', 'La victime sera sauvée si tu valides.');
    joueursDiv.innerHTML = `<div class="info-selection">Tu as choisi de sauver la victime des loups.</div>`;
    actionsDiv.innerHTML = `<button class="btn-action" onclick="validerChoixSorciere()">Continuer →</button>`;
}

function afficherChoixPotionMort() {
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    joueursDiv.innerHTML = `
        <div class="info-selection">Touche la victime de la potion de mort :</div>
        ${etat.joueursVivants.map(nom => `
            <div class="tag-joueur" onclick="sorciereTuer('${nom.replace(/'/g, "\\'")}')">${nom}</div>
        `).join('')}
    `;
    actionsDiv.innerHTML = `<button class="btn-secondaire" onclick="afficherActionSorciere(document.getElementById('joueurs-vivants'), document.getElementById('actions-jeu'))">Annuler</button>`;
}

function sorciereTuer(nom) {
    etat.choixSorciereTemp = { type: 'tuer', cible: nom };
    afficherRecapSorciere('☠️ Potion de mort prête', `${nom} sera empoisonné(e) si tu valides.`);
}

function sorciereRienFaire() {
    etat.choixSorciereTemp = { type: 'rien' };
    afficherRecapSorciere('🧙‍♀️ Aucune potion utilisée', 'La Sorcière ne fait rien cette nuit, sauf changement.');
}

function afficherRecapSorciere(titre, description) {
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    afficherPanneauSimple(panneau, '🧙‍♀️', titre, description);
    joueursDiv.innerHTML = `<div class="info-selection">Tu peux encore changer d'avis ci-dessous, ou valider.</div>`;
    let boutons = '';
    const victime = etat.victimeLoups;
    if (victime && !etat.potionVieUtilisee && etat.choixSorciereTemp.type !== 'sauver') boutons += `<button class="btn-action" onclick="sorciereSauver()">🧪 Utiliser la potion de vie</button>`;
    if (!etat.potionMortUtilisee && etat.choixSorciereTemp.type !== 'tuer') boutons += `<button class="btn-action danger" onclick="afficherChoixPotionMort()">☠️ Utiliser la potion de mort</button>`;
    if (etat.choixSorciereTemp.type !== 'rien') boutons += `<button class="btn-secondaire" onclick="sorciereRienFaire()">Ne rien faire</button>`;
    boutons += `<button class="btn-action" onclick="validerChoixSorciere()">Continuer →</button>`;
    actionsDiv.innerHTML = boutons;
}

function validerChoixSorciere() {
    const choix = etat.choixSorciereTemp || { type: 'rien' };
    if (choix.type === 'sauver') {
        etat.potionVieUtilisee = true;
        etat.victimeLoups = null;
        ajouterEtapeTimeline('🧙‍♀️ Sorcière', 'A utilisé la potion de vie.');
    } else if (choix.type === 'tuer') {
        etat.potionMortUtilisee = true;
        etat.victimeBonus = choix.cible;
        ajouterEtapeTimeline('🧙‍♀️ Sorcière', `A empoisonné ${choix.cible}.`);
    } else {
        ajouterEtapeTimeline('🧙‍♀️ Sorcière', 'N\'a utilisé aucune potion.');
    }
    etat.choixSorciereTemp = null;
    etapeNuitSuivante();
}

// ============================================
// SORCIÈRE DE SALEM
// ============================================
function afficherActionSorciereSalem(joueursDiv, actionsDiv) {
    etat.choixSorciereSalemTemp = { type: 'rien' };
    const victime = etat.victimeLoups;
    let html = victime ? `<div class="info-selection">🐺 Les loups ont attaqué : <strong>${victime}</strong></div>` : `<div class="info-selection">Aucune victime cette nuit.</div>`;
    joueursDiv.innerHTML = html;
    let boutons = '';
    if (victime && !etat.potionVieSalem) boutons += `<button class="btn-action" onclick="sorciereSalemSauver()">🧪 Potion de vie</button>`;
    if (!etat.potionMortSalem) boutons += `<button class="btn-action danger" onclick="sorciereSalemTuer()">☠️ Potion de mort</button>`;
    if (!etat.potionVeriteSalem) boutons += `<button class="btn-action" onclick="sorciereSalemVerite()">🔮 Potion de vérité</button>`;
    boutons += `<button class="btn-secondaire" onclick="sorciereSalemRienFaire()">Ne rien faire</button>`;
    actionsDiv.innerHTML = boutons;
}

function sorciereSalemSauver() {
    etat.choixSorciereSalemTemp = { type: 'sauver' };
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    afficherPanneauSimple(panneau, '🧪', 'Potion de vie prête', 'La victime sera sauvée si tu valides.');
    joueursDiv.innerHTML = `<div class="info-selection">Tu as choisi de sauver la victime des loups.</div>`;
    actionsDiv.innerHTML = `<button class="btn-action" onclick="validerChoixSorciereSalem()">Continuer →</button>`;
}

function sorciereSalemTuer() {
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    joueursDiv.innerHTML = `
        <div class="info-selection">☠️ Touche la victime de la potion de mort :</div>
        ${etat.joueursVivants.map(nom => `
            <div class="tag-joueur" onclick="sorciereSalemTuerCible('${nom.replace(/'/g, "\\'")}')">${nom}</div>
        `).join('')}
    `;
    actionsDiv.innerHTML = `<button class="btn-secondaire" onclick="afficherActionSorciereSalem(document.getElementById('joueurs-vivants'), document.getElementById('actions-jeu'))">Annuler</button>`;
}

function sorciereSalemTuerCible(nom) {
    etat.choixSorciereSalemTemp = { type: 'tuer', cible: nom };
    afficherRecapSorciereSalem('☠️ Potion de mort prête', `${nom} sera empoisonné(e) si tu valides.`);
}

function sorciereSalemVerite() {
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    joueursDiv.innerHTML = `
        <div class="info-selection">🔮 Touche le joueur à interroger avec la potion de vérité :</div>
        ${etat.joueursVivants.map(nom => `
            <div class="tag-joueur" onclick="sorciereSalemVeriteCible('${nom.replace(/'/g, "\\'")}')">${nom}</div>
        `).join('')}
    `;
    actionsDiv.innerHTML = `<button class="btn-secondaire" onclick="afficherActionSorciereSalem(document.getElementById('joueurs-vivants'), document.getElementById('actions-jeu'))">Annuler</button>`;
}

function sorciereSalemVeriteCible(nom) {
    etat.choixSorciereSalemTemp = { type: 'verite', cible: nom };
    afficherRecapSorciereSalem('🔮 Potion de vérité prête', `${nom} devra révéler son rôle au matin si tu valides.`);
}

function sorciereSalemRienFaire() {
    etat.choixSorciereSalemTemp = { type: 'rien' };
    afficherRecapSorciereSalem('🧙‍♀️ Aucune potion utilisée', 'La Sorcière ne fait rien cette nuit, sauf changement.');
}

function afficherRecapSorciereSalem(titre, description) {
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    afficherPanneauSimple(panneau, '🧙‍♀️🌿', titre, description);
    joueursDiv.innerHTML = `<div class="info-selection">Tu peux encore changer d'avis ci-dessous, ou valider.</div>`;
    let boutons = '';
    const victime = etat.victimeLoups;
    if (victime && !etat.potionVieSalem && etat.choixSorciereSalemTemp.type !== 'sauver') boutons += `<button class="btn-action" onclick="sorciereSalemSauver()">🧪 Potion de vie</button>`;
    if (!etat.potionMortSalem && etat.choixSorciereSalemTemp.type !== 'tuer') boutons += `<button class="btn-action danger" onclick="sorciereSalemTuer()">☠️ Potion de mort</button>`;
    if (!etat.potionVeriteSalem && etat.choixSorciereSalemTemp.type !== 'verite') boutons += `<button class="btn-action" onclick="sorciereSalemVerite()">🔮 Potion de vérité</button>`;
    if (etat.choixSorciereSalemTemp.type !== 'rien') boutons += `<button class="btn-secondaire" onclick="sorciereSalemRienFaire()">Ne rien faire</button>`;
    boutons += `<button class="btn-action" onclick="validerChoixSorciereSalem()">Continuer →</button>`;
    actionsDiv.innerHTML = boutons;
}

function validerChoixSorciereSalem() {
    const choix = etat.choixSorciereSalemTemp || { type: 'rien' };
    if (choix.type === 'sauver') {
        etat.potionVieSalem = true;
        etat.victimeLoups = null;
        ajouterEtapeTimeline('🧙‍♀️🌿 Sorcière de Salem', 'A utilisé la potion de vie.');
    } else if (choix.type === 'tuer') {
        etat.potionMortSalem = true;
        etat.victimeBonus = choix.cible;
        ajouterEtapeTimeline('🧙‍♀️🌿 Sorcière de Salem', `A empoisonné ${choix.cible}.`);
    } else if (choix.type === 'verite') {
        etat.potionVeriteSalem = true;
        etat.joueurVerite = choix.cible;
        ajouterEtapeTimeline('🧙‍♀️🌿 Sorcière de Salem', `${choix.cible} devra révéler son rôle au matin !`);
    } else {
        ajouterEtapeTimeline('🧙‍♀️🌿 Sorcière de Salem', 'N\'a utilisé aucune potion.');
    }
    etat.choixSorciereSalemTemp = null;
    etapeNuitSuivante();
}

// ============================================
// ENFANT SAUVAGE
// ============================================
function afficherActionEnfantSauvage(joueursDiv, actionsDiv) {
    const nomEnfant = etat.joueursVivants.find(n => estVivantEtRole(n, ['enfant-sauvage']));
    if (!nomEnfant) {
        joueursDiv.innerHTML = '';
        actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
        return;
    }
    etat.enfantSauvageNom = nomEnfant;
    const candidats = etat.joueursVivants.filter(n => n !== nomEnfant);
    joueursDiv.innerHTML = `
        <div class="info-selection"><strong>${nomEnfant}</strong> (Enfant Sauvage) touche son modèle :</div>
        ${candidats.map(n => `
            <div class="tag-joueur ${n === etat.modeleEnfantSauvage ? 'selectionne-cible' : ''}" onclick="choisirModeleEnfantSauvage('${n.replace(/'/g, "\\'")}')">${n}</div>
        `).join('')}
    `;
    actionsDiv.innerHTML = etat.modeleEnfantSauvage ? `<button class="btn-action" onclick="validerEnfantSauvage()">Continuer →</button>` : '';
}

function choisirModeleEnfantSauvage(nom) {
    etat.modeleEnfantSauvage = nom;
    afficherActionEnfantSauvage(document.getElementById('joueurs-vivants'), document.getElementById('actions-jeu'));
}

function validerEnfantSauvage() {
    ajouterEtapeTimeline('🌿 Enfant Sauvage', `A choisi ${etat.modeleEnfantSauvage} comme modèle.`);
    etapeNuitSuivante();
}

// ============================================
// DEUX SŒURS / TROIS FRÈRES
// ============================================
function afficherActionGroupeReconnaissance(roleId, joueursDiv, actionsDiv) {
    const membres = etat.joueursVivants.filter(n => estVivantEtRole(n, [roleId]));
    const nomGroupe = roleId === 'deux-soeurs' ? 'Sœurs' : 'Frères';
    if (membres.length < 2) {
        joueursDiv.innerHTML = '';
        actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
        return;
    }
    joueursDiv.innerHTML = `<div class="info-selection">Les ${nomGroupe} se reconnaissent : <strong>${membres.join(', ')}</strong></div>`;
    actionsDiv.innerHTML = `<button class="btn-action" onclick="validerGroupeReconnaissance('${roleId}')">Continuer →</button>`;
}

function validerGroupeReconnaissance(roleId) {
    const nomGroupe = roleId === 'deux-soeurs' ? '👯‍♀️ Deux Sœurs' : '👨‍👦‍👦 Trois Frères';
    ajouterEtapeTimeline(nomGroupe, 'Se sont reconnu(e)s entre eux.');
    etapeNuitSuivante();
}

// ============================================
// LOUP FOU
// ============================================
function afficherActionLoupFou(joueursDiv, actionsDiv) {
    const candidats = etat.joueursVivants.filter(n => {
        const role = etat.rolesAttribues[etat.joueurs.indexOf(n)];
        return role && !role.id.includes('loup') && n !== etat.victimeLoups;
    });
    if (candidats.length === 0) {
        joueursDiv.innerHTML = `<div class="info-selection">Aucun villageois disponible à attaquer.</div>`;
        actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
        return;
    }
    joueursDiv.innerHTML = `
        <div class="info-selection">Touche un villageois à éliminer (optionnel) :</div>
        ${candidats.map(nom => `
            <div class="tag-joueur ${nom === etat.victimeLoupFou ? 'selectionne-cible' : ''}" onclick="choisirVictimeLoupFou('${nom.replace(/'/g, "\\'")}')">${nom}</div>
        `).join('')}
    `;
    actionsDiv.innerHTML = `
        ${etat.victimeLoupFou ? `<button class="btn-action" onclick="validerLoupFou()">Continuer →</button>` : ''}
        <button class="btn-secondaire" onclick="etapeNuitSuivante()">Ne pas attaquer</button>
    `;
}

function choisirVictimeLoupFou(nom) {
    etat.victimeLoupFou = nom;
    afficherActionLoupFou(document.getElementById('joueurs-vivants'), document.getElementById('actions-jeu'));
}

function validerLoupFou() {
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    afficherPanneauSimple(panneau, '🃏🐺', 'Le Loup Fou frappe !', `${etat.victimeLoupFou} a été ciblé(e) par le Loup Fou.`);
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
    etat.journalNuit.push(`🃏🐺 Le Loup Fou a attaqué séparément.`);
    ajouterEtapeTimeline('🃏🐺 Loup Fou', `${etat.victimeLoupFou} a été ciblé(e).`);
}

// ============================================
// VOLEUR : vole un rôle (nuit 1 seulement, une fois)
// ============================================
function afficherActionVoleur(joueursDiv, actionsDiv) {
    const nomVoleur = etat.joueursVivants.find(n => estVivantEtRole(n, ['voleur']));
    if (!nomVoleur || etat.voleurAJoue) {
        joueursDiv.innerHTML = '';
        actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
        return;
    }
    const candidats = etat.joueursVivants.filter(n => {
        if (n === nomVoleur) return false;
        const role = etat.rolesAttribues[etat.joueurs.indexOf(n)];
        return role && !role.id.includes('loup'); // ne peut pas voler un loup
    });
    joueursDiv.innerHTML = `
        <div class="info-selection"><strong>${nomVoleur}</strong> (Voleur) touche sa victime :</div>
        ${candidats.map(n => `<div class="tag-joueur ${n === etat.cibleVoleur ? 'selectionne-cible' : ''}" onclick="choisirCibleVoleur('${n.replace(/'/g, "\\'")}')">${n}</div>`).join('')}
    `;
    actionsDiv.innerHTML = `
        ${etat.cibleVoleur ? `<button class="btn-action" onclick="validerVoleur()">Continuer →</button>` : ''}
        <button class="btn-secondaire" onclick="passerVoleur()">Ne pas voler cette nuit</button>
    `;
}

function choisirCibleVoleur(nom) {
    etat.cibleVoleur = nom;
    afficherActionVoleur(document.getElementById('joueurs-vivants'), document.getElementById('actions-jeu'));
}

function validerVoleur() {
    const nomVoleur = etat.joueursVivants.find(n => estVivantEtRole(n, ['voleur']));
    const indexVoleur = etat.joueurs.indexOf(nomVoleur);
    const indexCible = etat.joueurs.indexOf(etat.cibleVoleur);
    const roleVole = etat.rolesAttribues[indexCible];
    const roleVillageois = trouverRole('villageois');

    etat.rolesAttribues[indexVoleur] = roleVole; // le Voleur prend le rôle
    etat.rolesAttribues[indexCible] = roleVillageois; // la victime devient simple Villageois
    etat.voleurAJoue = true;

    ajouterEtapeTimeline('🎭 Voleur', `A volé le rôle de ${etat.cibleVoleur} (devenu ${roleVole.emoji} ${roleVole.nom}).`);

    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    afficherPanneauSimple(panneau, '🎭', 'Vol réussi !', `Le Voleur est désormais ${roleVole.emoji} ${roleVole.nom}. ${etat.cibleVoleur} est devenu(e) simple Villageois.`);
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
    etat.cibleVoleur = null;
}

function passerVoleur() {
    etat.voleurAJoue = true;
    etat.cibleVoleur = null;
    etapeNuitSuivante();
}

// ============================================
// SECTAIRE : recrute chaque nuit
// ============================================
function afficherActionSectaire(joueursDiv, actionsDiv) {
    const nomSectaire = etat.joueursVivants.find(n => estVivantEtRole(n, ['sectaire']));
    if (!nomSectaire) {
        joueursDiv.innerHTML = '';
        actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
        return;
    }
    etat.membresSecte = etat.membresSecte || [];
    const candidats = etat.joueursVivants.filter(n => n !== nomSectaire && !etat.membresSecte.includes(n));
    joueursDiv.innerHTML = `
        <div class="info-selection"><strong>${nomSectaire}</strong> (Sectaire) recrute :</div>
        ${candidats.map(n => `<div class="tag-joueur" onclick="sectaireRecrute('${n.replace(/'/g, "\\'")}')">${n}</div>`).join('')}
    `;
    actionsDiv.innerHTML = `<button class="btn-secondaire" onclick="etapeNuitSuivante()">Ne recruter personne</button>`;
}

function sectaireRecrute(nom) {
    etat.membresSecte = etat.membresSecte || [];
    etat.membresSecte.push(nom);
    ajouterEtapeTimeline('🙏 Sectaire', `Un nouveau membre a rejoint la secte en secret.`);
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    afficherPanneauSimple(panneau, '🙏', 'Recrutement', `${nom} a rejoint la secte (en secret).`);
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
}

// ============================================
// PYROMANE : arrose puis enflamme (une fois)
// ============================================
function afficherActionPyromane(joueursDiv, actionsDiv) {
    const nomPyromane = etat.joueursVivants.find(n => estVivantEtRole(n, ['pyromane']));
    if (!nomPyromane) {
        joueursDiv.innerHTML = '';
        actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
        return;
    }
    etat.arroses = etat.arroses || [];
    etat.selectionArrosage = etat.selectionArrosage || [];
    const candidats = etat.joueursVivants.filter(n => n !== nomPyromane);

    joueursDiv.innerHTML = `
        <div class="info-selection"><strong>${nomPyromane}</strong> (Pyromane) — Déjà arrosés : ${etat.arroses.length > 0 ? etat.arroses.join(', ') : 'aucun'}</div>
        ${candidats.map(n => `<div class="tag-joueur ${etat.selectionArrosage.includes(n) ? 'selectionne-cible' : ''}" onclick="toggleArrosage('${n.replace(/'/g, "\\'")}')">${n}</div>`).join('')}
    `;
    let boutons = `<button class="btn-action" ${etat.selectionArrosage.length === 0 ? 'disabled' : ''} onclick="validerArrosage()">⛽ Arroser ces joueurs</button>`;
    if (etat.arroses.length > 0) {
        boutons += `<button class="btn-action danger" onclick="allumerFeu()">🔥 Tout enflammer (définitif !)</button>`;
    }
    boutons += `<button class="btn-secondaire" onclick="etapeNuitSuivante()">Ne rien faire cette nuit</button>`;
    actionsDiv.innerHTML = boutons;
}

function toggleArrosage(nom) {
    etat.selectionArrosage = etat.selectionArrosage || [];
    if (etat.selectionArrosage.includes(nom)) {
        etat.selectionArrosage = etat.selectionArrosage.filter(n => n !== nom);
    } else if (etat.selectionArrosage.length < 2) {
        etat.selectionArrosage.push(nom);
    }
    afficherActionPyromane(document.getElementById('joueurs-vivants'), document.getElementById('actions-jeu'));
}

function validerArrosage() {
    etat.arroses = etat.arroses || [];
    etat.arroses = [...new Set([...etat.arroses, ...etat.selectionArrosage])];
    const noms = etat.selectionArrosage.join(' et ');
    etat.selectionArrosage = [];
    ajouterEtapeTimeline('🔥 Pyromane', `${noms} ont été arrosés d'essence.`);
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    afficherPanneauSimple(panneau, '⛽', 'Arrosage effectué', `${noms} sont désormais couverts d'essence.`);
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
}

function allumerFeu() {
    etat.feuAllume = true;
    etat.victimesIncendie = [...etat.arroses];
    ajouterEtapeTimeline('🔥 Pyromane', `A enflammé tous les joueurs arrosés : ${etat.victimesIncendie.join(', ')} !`);
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    afficherPanneauSimple(panneau, '🔥', 'Incendie !', `Les joueurs arrosés brûlent vifs : ${etat.victimesIncendie.join(', ')}.`);
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
}

// ============================================
// LOUP-FÉTICHE : protège un loup contre les attaques neutres
// ============================================
function afficherActionLoupFetiche(joueursDiv, actionsDiv) {
    const nomFetiche = etat.joueursVivants.find(n => estVivantEtRole(n, ['loup-fetiche']));
    if (!nomFetiche) {
        joueursDiv.innerHTML = '';
        actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
        return;
    }
    const autresLoups = etat.joueursVivants.filter(n => {
        if (n === nomFetiche) return false;
        const role = etat.rolesAttribues[etat.joueurs.indexOf(n)];
        return role && role.id.includes('loup');
    });
    if (autresLoups.length === 0) {
        joueursDiv.innerHTML = `<div class="info-selection">Aucun autre loup à protéger.</div>`;
        actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
        return;
    }
    joueursDiv.innerHTML = `
        <div class="info-selection"><strong>${nomFetiche}</strong> (Loup-Fétiche) protège un loup (optionnel) :</div>
        ${autresLoups.map(n => `<div class="tag-joueur ${n === etat.loupProtegeFetiche ? 'selectionne-cible' : ''}" onclick="choisirLoupFetiche('${n.replace(/'/g, "\\'")}')">${n}</div>`).join('')}
    `;
    actionsDiv.innerHTML = `
        ${etat.loupProtegeFetiche ? `<button class="btn-action" onclick="validerLoupFetiche()">Continuer →</button>` : ''}
        <button class="btn-secondaire" onclick="etapeNuitSuivante()">Ne protéger personne</button>
    `;
}

function choisirLoupFetiche(nom) {
    etat.loupProtegeFetiche = nom;
    afficherActionLoupFetiche(document.getElementById('joueurs-vivants'), document.getElementById('actions-jeu'));
}

function validerLoupFetiche() {
    ajouterEtapeTimeline('🐺🛡️ Loup-Fétiche', `Protège ${etat.loupProtegeFetiche} cette nuit.`);
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    afficherPanneauSimple(panneau, '🐺🛡️', 'Protection accordée', `${etat.loupProtegeFetiche} est protégé(e) contre les attaques neutres cette nuit.`);
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
}

// ============================================
// LOUP-VOYOU : tue séparément un Villageois sans pouvoir
// ============================================
function afficherActionLoupVoyou(joueursDiv, actionsDiv) {
    const nomVoyou = etat.joueursVivants.find(n => estVivantEtRole(n, ['loup-voyou']));
    if (!nomVoyou) {
        joueursDiv.innerHTML = '';
        actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
        return;
    }
    // Cible uniquement les Villageois sans pouvoir spécial (simple "villageois")
    const candidats = etat.joueursVivants.filter(n => {
        if (n === nomVoyou) return false;
        const role = etat.rolesAttribues[etat.joueurs.indexOf(n)];
        return role && role.id === 'villageois';
    });
    if (candidats.length === 0) {
        joueursDiv.innerHTML = `<div class="info-selection">Aucun Villageois sans pouvoir à attaquer.</div>`;
        actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
        return;
    }
    joueursDiv.innerHTML = `
        <div class="info-selection"><strong>${nomVoyou}</strong> (Loup-Voyou) cible un Villageois sans pouvoir (optionnel) :</div>
        ${candidats.map(n => `<div class="tag-joueur ${n === etat.victimeLoupVoyou ? 'selectionne-cible' : ''}" onclick="choisirVictimeLoupVoyou('${n.replace(/'/g, "\\'")}')">${n}</div>`).join('')}
    `;
    actionsDiv.innerHTML = `
        ${etat.victimeLoupVoyou ? `<button class="btn-action" onclick="validerLoupVoyou()">Continuer →</button>` : ''}
        <button class="btn-secondaire" onclick="etapeNuitSuivante()">Ne pas attaquer</button>
    `;
}

function choisirVictimeLoupVoyou(nom) {
    etat.victimeLoupVoyou = nom;
    afficherActionLoupVoyou(document.getElementById('joueurs-vivants'), document.getElementById('actions-jeu'));
}

function validerLoupVoyou() {
    ajouterEtapeTimeline('🐺 Loup-Voyou', `${etat.victimeLoupVoyou} a été attaqué(e) séparément.`);
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    afficherPanneauSimple(panneau, '🐺', 'Attaque silencieuse', `${etat.victimeLoupVoyou} a été pris(e) pour cible par le Loup-Voyou.`);
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
}

// ============================================
// PRÊTRE : bénit le couple d'Amoureux (1 fois, nuit 1)
// ============================================
function afficherActionPretre(joueursDiv, actionsDiv) {
    const nomPretre = etat.joueursVivants.find(n => estVivantEtRole(n, ['pretre']));
    if (!nomPretre || etat.pretreAJoue) {
        joueursDiv.innerHTML = '';
        actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
        return;
    }
    if (!etat.amoureux || etat.amoureux.length !== 2) {
        joueursDiv.innerHTML = `<div class="info-selection">Il n'y a pas de couple d'Amoureux à bénir.</div>`;
        actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
        return;
    }
    joueursDiv.innerHTML = `
        <div class="info-selection"><strong>${nomPretre}</strong> (Prêtre) peut bénir le couple : <strong>${etat.amoureux[0]} & ${etat.amoureux[1]}</strong></div>
    `;
    actionsDiv.innerHTML = `
        <button class="btn-action" onclick="benirCouple()">✝️ Bénir le couple</button>
        <button class="btn-secondaire" onclick="passerPretre()">Ne pas bénir</button>
    `;
}

function benirCouple() {
    etat.pretreAJoue = true;
    etat.coupleBeni = true;
    ajouterEtapeTimeline('✝️ Prêtre', `A béni le couple ${etat.amoureux[0]} & ${etat.amoureux[1]} ! Le lien de mort est brisé.`);
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    afficherPanneauSimple(panneau, '✝️', 'Bénédiction accordée', `Le couple ne mourra plus de chagrin si l'un d'eux est éliminé.`);
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
}

function passerPretre() {
    etat.pretreAJoue = true;
    etapeNuitSuivante();
}

// ============================================
// AMANT DÉLAISSÉ : choisit secrètement un Amoureux (nuit 1)
// ============================================
function afficherActionAmantDelaisse(joueursDiv, actionsDiv) {
    const nomAmant = etat.joueursVivants.find(n => estVivantEtRole(n, ['amant-delaisse']));
    if (!nomAmant || etat.amantDelaisseAJoue) {
        joueursDiv.innerHTML = '';
        actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
        return;
    }
    if (!etat.amoureux || etat.amoureux.length !== 2) {
        joueursDiv.innerHTML = `<div class="info-selection">Il n'y a pas d'Amoureux pour l'instant.</div>`;
        actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
        return;
    }
    joueursDiv.innerHTML = `
        <div class="info-selection"><strong>${nomAmant}</strong> (Amant Délaissé) choisit secrètement son amour :</div>
        ${etat.amoureux.map(n => `<div class="tag-joueur ${n === etat.amourSecret ? 'selectionne-cible' : ''}" onclick="choisirAmourSecret('${n.replace(/'/g, "\\'")}')">${n}</div>`).join('')}
    `;
    actionsDiv.innerHTML = etat.amourSecret
        ? `<button class="btn-action" onclick="validerAmantDelaisse()">Continuer →</button>`
        : '';
}

function choisirAmourSecret(nom) {
    etat.amourSecret = nom;
    afficherActionAmantDelaisse(document.getElementById('joueurs-vivants'), document.getElementById('actions-jeu'));
}

function validerAmantDelaisse() {
    etat.amantDelaisseAJoue = true;
    ajouterEtapeTimeline('💔 Amant Délaissé', `A choisi son amour secret.`);
    etapeNuitSuivante();
}

// ============================================
// FIN DE PARTIE
// FIN roles-speciaux.js