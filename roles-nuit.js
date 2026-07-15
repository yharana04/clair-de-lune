// ============================================
// RENARD
// ============================================
function afficherActionRenard(joueursDiv, actionsDiv) {
    etat.selectionRenard = etat.selectionRenard || [];
    joueursDiv.innerHTML = `
        <div class="info-selection">Touche 3 joueurs à flairer (${etat.selectionRenard.length}/3) :</div>
        ${etat.joueursVivants.map(nom => `
            <div class="tag-joueur ${etat.selectionRenard.includes(nom) ? 'selectionne-cible' : ''}" onclick="toggleRenard('${nom.replace(/'/g, "\\'")}')">${nom}</div>
        `).join('')}
    `;
    actionsDiv.innerHTML = `
        <button class="btn-action" ${etat.selectionRenard.length !== 3 ? 'disabled' : ''} onclick="validerRenard()">Valider le flair</button>
        <button class="btn-secondaire" onclick="etapeNuitSuivante()">Le Renard ne flaire pas cette nuit</button>
    `;
}

function toggleRenard(nom) {
    etat.selectionRenard = etat.selectionRenard || [];
    if (etat.selectionRenard.includes(nom)) etat.selectionRenard = etat.selectionRenard.filter(n => n !== nom);
    else if (etat.selectionRenard.length < 3) etat.selectionRenard.push(nom);
    afficherActionRenard(document.getElementById('joueurs-vivants'), document.getElementById('actions-jeu'));
}

function validerRenard() {
    const groupe = etat.selectionRenard;
    const contientLoup = groupe.some(nom => {
        const role = etat.rolesAttribues[etat.joueurs.indexOf(nom)];
        return role && role.id.includes('loup') && role.id !== 'loup-blanc' && role.id !== 'loup-fou' && role.id !== 'loup-solitaire';
    });
    etat.dernierGroupeRenard = [...groupe];
    etat.selectionRenard = [];
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    const nomRenard = etat.joueursVivants.find(n => estVivantEtRole(n, ['renard']));
    if (contientLoup) {
        afficherPanneauSimple(panneau, '🦊', 'Un loup rôde près d\'eux !', 'Le Renard a senti une odeur de loup dans le groupe !');
        ajouterEtapeTimeline('🦊 Renard', `${nomRenard ? nomRenard + ' — ' : ''}A flairé un loup dans le groupe.`);
    } else {
        afficherPanneauSimple(panneau, '🦊', 'Que des innocents...', 'Le Renard a scruté le groupe mais n\'a rien trouvé.');
        ajouterEtapeTimeline('🦊 Renard', `${nomRenard ? nomRenard + ' — ' : ''}Aucun loup trouvé.`);
    }
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
}

function verifierPiegeRenard(morts) {
    if (!etat.renardActif) return;
    if (!etat.dernierGroupeRenard || etat.dernierGroupeRenard.length === 0) return;
    const aPerduPouvoir = morts.some(nomMort => etat.dernierGroupeRenard.includes(nomMort));
    if (aPerduPouvoir) {
        etat.renardActif = false;
        const nomRenard = etat.joueursVivants.find(n => estVivantEtRole(n, ['renard']));
        ajouterEtapeTimeline('🦊 Renard', `${nomRenard ? nomRenard + ' — ' : ''}L'un des membres du groupe flairé est mort. Son flair est perdu à jamais !`);
    }
}

// ============================================
// CORBEAU
// ============================================
function afficherActionCorbeau(joueursDiv, actionsDiv) {
    joueursDiv.innerHTML = `
        <div class="info-selection">🐦‍⬛ Touche le joueur à maudire :</div>
        ${etat.joueursVivants.map(nom => `
            <div class="tag-joueur" onclick="choisirCibleCorbeau('${nom.replace(/'/g, "\\'")}')">${nom}</div>
        `).join('')}
    `;
    actionsDiv.innerHTML = `<button class="btn-secondaire" onclick="etapeNuitSuivante()">Le Corbeau ne maudit personne</button>`;
}

function choisirCibleCorbeau(nom) {
    etat.joueurMaudit = nom;
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    panneau.innerHTML = `
        <div class="carte-joueur-nom">${nom} est maudit(e) !</div>
        <div class="carte-conteneur">
            <div class="carte-revelee">
                <img src="images/corbeau.jpg" alt="Corbeau" class="carte-image" onerror="this.style.display='none'">
                <div class="carte-infos">
                    <div class="carte-role-nom">🐦‍⬛ MALÉDICTION</div>
                    <div class="carte-role-desc">${nom} aura 2 voix contre lui au prochain vote.</div>
                </div>
            </div>
        </div>
    `;
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
    ajouterEtapeTimeline('🐦‍⬛ Corbeau', `A maudit ${nom}.`);
}

// ============================================
// JUGE CORROMPU
// ============================================
function afficherActionJugeCorrompu(joueursDiv, actionsDiv) {
    if (etat.jugeUtilise) {
        joueursDiv.innerHTML = `<div class="info-selection">Le Juge Corrompu a déjà utilisé son pouvoir.</div>`;
        actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
        return;
    }
    joueursDiv.innerHTML = `
        <div class="info-selection">⚖️ Touche le joueur que le village devra juger :</div>
        ${etat.joueursVivants.map(nom => `
            <div class="tag-joueur" onclick="choisirCibleJuge('${nom.replace(/'/g, "\\'")}')">${nom}</div>
        `).join('')}
    `;
    actionsDiv.innerHTML = `<button class="btn-secondaire" onclick="etapeNuitSuivante()">Le Juge garde son pouvoir</button>`;
}

function choisirCibleJuge(nom) {
    etat.jugeUtilise = true;
    etat.jugeImpose = nom;
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    afficherPanneauSimple(panneau, '⚖️', 'Jugement imposé !', `${nom} sera le seul candidat au prochain vote. Le village votera POUR ou CONTRE lui.`);
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
    ajouterEtapeTimeline('⚖️ Juge Corrompu', `A imposé ${nom} comme unique candidat au prochain vote.`);
}

// ============================================
// GARDE CHAMPÊTRE
// ============================================
function afficherActionGardeChampetre(joueursDiv, actionsDiv) {
    etat.selectionGarde = etat.selectionGarde || [];
    joueursDiv.innerHTML = `
        <div class="info-selection">🚧 Touche 2 joueurs qui ne pourront PAS voter l'un contre l'autre (${etat.selectionGarde.length}/2) :</div>
        ${etat.joueursVivants.map(nom => `
            <div class="tag-joueur ${etat.selectionGarde.includes(nom) ? 'selectionne-cible' : ''}" onclick="toggleGarde('${nom.replace(/'/g, "\\'")}')">${nom}</div>
        `).join('')}
    `;
    actionsDiv.innerHTML = `
        <button class="btn-action" ${etat.selectionGarde.length !== 2 ? 'disabled' : ''} onclick="validerGardeChampetre()">Valider la protection</button>
        <button class="btn-secondaire" onclick="etapeNuitSuivante()">Le Garde ne fait rien</button>
    `;
}

function toggleGarde(nom) {
    etat.selectionGarde = etat.selectionGarde || [];
    if (etat.selectionGarde.includes(nom)) etat.selectionGarde = etat.selectionGarde.filter(n => n !== nom);
    else if (etat.selectionGarde.length < 2) etat.selectionGarde.push(nom);
    afficherActionGardeChampetre(document.getElementById('joueurs-vivants'), document.getElementById('actions-jeu'));
}

function validerGardeChampetre() {
    const [a, b] = etat.selectionGarde;
    etat.gardeProtege = [a, b];
    etat.selectionGarde = [];
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    afficherPanneauSimple(panneau, '🚧', 'Protection posée !', `${a} et ${b} ne pourront pas voter l'un contre l'autre au prochain vote.`);
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
    ajouterEtapeTimeline('🚧 Garde Champêtre', `A protégé ${a} et ${b} l'un contre l'autre.`);
}

// ============================================
// DÉTECTIVE
// ============================================
function afficherActionDetective(joueursDiv, actionsDiv) {
    joueursDiv.innerHTML = `
        <div class="info-selection">🔎 Touche un joueur à sonder :</div>
        ${etat.joueursVivants.map(nom => `
            <div class="tag-joueur" onclick="choisirCibleDetective('${nom.replace(/'/g, "\\'")}')">${nom}</div>
        `).join('')}
    `;
    actionsDiv.innerHTML = `<button class="btn-secondaire" onclick="etapeNuitSuivante()">Le Détective ne fait rien</button>`;
}

function choisirCibleDetective(nom) {
    const indexJoueur = etat.joueurs.indexOf(nom);
    const role = etat.rolesAttribues[indexJoueur];
    const estVillage = !role.id.includes('loup') && role.id !== 'loup-blanc' && role.id !== 'loup-solitaire' && role.id !== 'loup-fou';
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    afficherPanneauSimple(panneau, '🔎', 'Résultat de l\'enquête !', `${nom} est ${estVillage ? 'du CAMP DU VILLAGE 🧑‍🌾' : 'du CAMP ADVERSE (Loup ou Neutre) ⚠️'}.`);
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
    ajouterEtapeTimeline('🔎 Détective', `A sondé ${nom}.`);
}

// ============================================
// ENQUÊTEUR
// ============================================
function afficherActionEnqueteur(joueursDiv, actionsDiv) {
    joueursDiv.innerHTML = `
        <div class="info-selection">🔍 Touche un joueur à enquêter :</div>
        ${etat.joueursVivants.map(nom => `
            <div class="tag-joueur" onclick="choisirCibleEnqueteur('${nom.replace(/'/g, "\\'")}')">${nom}</div>
        `).join('')}
    `;
    actionsDiv.innerHTML = `<button class="btn-secondaire" onclick="etapeNuitSuivante()">L'Enquêteur ne fait rien</button>`;
}

function choisirCibleEnqueteur(nom) {
    const tousLesRoles = [...ROLES.loups, ...ROLES.villageois, ...ROLES.neutres];
    const rolesEnJeu = Object.keys(etat.rolesSelectionnes);
    const rolesHorsJeu = tousLesRoles.filter(r => !rolesEnJeu.includes(r.id) && r.id !== 'comedien');
    const rolePioche = rolesHorsJeu.length > 0 ? rolesHorsJeu[Math.floor(Math.random() * rolesHorsJeu.length)] : trouverRole('villageois');
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    afficherPanneauSimple(panneau, '🔍', 'Enquête terminée !', `Le rôle de ${nom} n'est PAS ${rolePioche.emoji} ${rolePioche.nom}.`);
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
    ajouterEtapeTimeline('🔍 Enquêteur', `A enquêté sur ${nom}.`);
}

// ============================================
// MONTREUR D'OURS
// ============================================
function afficherActionOurs(panneau, joueursDiv, actionsDiv) {
    joueursDiv.innerHTML = `<div class="info-selection">Y a-t-il un Loup-Garou vivant à côté du Montreur d'Ours (selon votre disposition à table) ?</div>`;
    actionsDiv.innerHTML = `
        <button class="btn-action danger" onclick="resultatOurs(true)">🐻 Oui, l'ours grogne</button>
        <button class="btn-action" onclick="resultatOurs(false)">L'ours reste calme</button>
    `;
}

function resultatOurs(grogne) {
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    if (grogne) {
        afficherPanneauSimple(panneau, '🐻', 'L\'ours grogne !', 'Un loup se trouve tout près...');
        ajouterEtapeTimeline('🐻 Montreur d\'Ours', 'L\'ours a grogné.');
    } else {
        afficherPanneauSimple(panneau, '🐻', 'L\'ours est calme.', 'Aucun danger immédiat détecté.');
        ajouterEtapeTimeline('🐻 Montreur d\'Ours', 'Est resté calme.');
    }
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
}

// ============================================
// JOUEUR DE FLÛTE
// ============================================
function afficherActionFlute(joueursDiv, actionsDiv) {
    etat.selectionFlute = etat.selectionFlute || [];
    const candidats = etat.joueursVivants.filter(n => !(etat.ensorceles || []).includes(n));
    joueursDiv.innerHTML = `
        <div class="info-selection">Touche 2 joueurs à ensorceler (${etat.selectionFlute.length}/2) :</div>
        ${candidats.map(nom => `
            <div class="tag-joueur ${etat.selectionFlute.includes(nom) ? 'selectionne-cible' : ''}" onclick="toggleFlute('${nom.replace(/'/g, "\\'")}')">${nom}</div>
        `).join('')}
    `;
    actionsDiv.innerHTML = `
        <button class="btn-action" ${etat.selectionFlute.length !== 2 ? 'disabled' : ''} onclick="validerFlute()">Valider</button>
        <button class="btn-secondaire" onclick="etapeNuitSuivante()">Passer</button>
    `;
}

function toggleFlute(nom) {
    etat.selectionFlute = etat.selectionFlute || [];
    if (etat.selectionFlute.includes(nom)) etat.selectionFlute = etat.selectionFlute.filter(n => n !== nom);
    else if (etat.selectionFlute.length < 2) etat.selectionFlute.push(nom);
    afficherActionFlute(document.getElementById('joueurs-vivants'), document.getElementById('actions-jeu'));
}

function validerFlute() {
    etat.ensorceles = etat.ensorceles || [];
    etat.ensorceles = [...new Set([...etat.ensorceles, ...etat.selectionFlute])];
    const noms = etat.selectionFlute.join(' et ');
    etat.selectionFlute = [];
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    afficherPanneauSimple(panneau, '🪈', 'Ensorcelés !', `${noms} sont désormais sous le charme.`);
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
    ajouterEtapeTimeline('🪈 Joueur de Flûte', `${noms} sont ensorcelés.`);
}

// ============================================
// GRAND MÉCHANT LOUP
// ============================================
function afficherActionGrandMechantLoup(joueursDiv, actionsDiv) {
    const nbLoupsMorts = etat.joueurs.filter((nom, i) => {
        const r = etat.rolesAttribues[i];
        return r && r.id.includes('loup') && r.id !== 'loup-blanc' && r.id !== 'loup-fou' && r.id !== 'loup-solitaire' && !etat.joueursVivants.includes(nom);
    }).length;
    if (nbLoupsMorts > 0) {
        joueursDiv.innerHTML = `<div class="info-selection">Un loup est déjà mort : le Grand Méchant Loup ne peut pas agir deux fois.</div>`;
        actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
        return;
    }
    const candidats = etat.joueursVivants.filter(n => n !== etat.victimeLoups);
    joueursDiv.innerHTML = `
        <div class="info-selection">Touche une 2ème victime (optionnel) :</div>
        ${candidats.map(nom => `
            <div class="tag-joueur" onclick="choisirVictimeGML('${nom.replace(/'/g, "\\'")}')">${nom}</div>
        `).join('')}
    `;
    actionsDiv.innerHTML = `<button class="btn-secondaire" onclick="etapeNuitSuivante()">Ne pas attaquer une 2ème fois</button>`;
}

function choisirVictimeGML(nom) {
    etat.victimeGML = nom;
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    afficherPanneauSimple(panneau, '🐺', 'Seconde victime désignée', `${nom} est aussi attaqué(e) cette nuit.`);
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
    ajouterEtapeTimeline('🐺 Grand Méchant Loup', `${nom} a aussi été attaqué(e).`);
}

// ============================================
// INFECT PÈRE DES LOUPS
// ============================================
function afficherActionInfectPere(joueursDiv, actionsDiv) {
    if (etat.infectionUtilisee) {
        joueursDiv.innerHTML = `<div class="info-selection">L'Infect Père des Loups a déjà utilisé son pouvoir.</div>`;
        actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
        return;
    }
    if (!etat.victimeLoups) {
        joueursDiv.innerHTML = `<div class="info-selection">Aucune victime désignée cette nuit par les loups.</div>`;
        actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
        return;
    }
    joueursDiv.innerHTML = `<div class="info-selection">Infecter <strong>${etat.victimeLoups}</strong>, la victime de cette nuit ?</div>`;
    actionsDiv.innerHTML = `
        <button class="btn-action" onclick="infecterVictime()">🐺 Infecter (devient loup, ne meurt pas)</button>
        <button class="btn-secondaire" onclick="etapeNuitSuivante()">Ne pas infecter</button>
    `;
}

function infecterVictime() {
    etat.infectionUtilisee = true;
    etat.joueursInfectes = etat.joueursInfectes || [];
    etat.joueursInfectes.push(etat.victimeLoups);
    const nom = etat.victimeLoups;
    etat.victimeLoups = null;
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    afficherPanneauSimple(panneau, '🐺', 'Infection réussie', `${nom} a rejoint le camp des Loups-Garous en secret.`);
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
    ajouterEtapeTimeline('🐺 Infect Père des Loups', `${nom} a été infecté(e).`);
}

// ============================================
// LOUP BLANC
// ============================================
function afficherActionLoupBlanc(joueursDiv, actionsDiv) {
    const autresLoups = etat.joueursVivants.filter(nom => {
        const role = etat.rolesAttribues[etat.joueurs.indexOf(nom)];
        return role && role.id.includes('loup') && role.id !== 'loup-blanc' && role.id !== 'loup-fou' && role.id !== 'loup-solitaire';
    });
    if (autresLoups.length === 0) {
        joueursDiv.innerHTML = `<div class="info-selection">Aucun autre loup à éliminer.</div>`;
        actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
        return;
    }
    joueursDiv.innerHTML = `
        <div class="info-selection">Touche un loup à éliminer (optionnel) :</div>
        ${autresLoups.map(nom => `
            <div class="tag-joueur" onclick="choisirVictimeLoupBlanc('${nom.replace(/'/g, "\\'")}')">${nom}</div>
        `).join('')}
    `;
    actionsDiv.innerHTML = `<button class="btn-secondaire" onclick="etapeNuitSuivante()">Ne pas attaquer</button>`;
}

function choisirVictimeLoupBlanc(nom) {
    etat.victimeLoupBlanc = nom;
    const panneau = document.getElementById('panneau-phase');
    const joueursDiv = document.getElementById('joueurs-vivants');
    const actionsDiv = document.getElementById('actions-jeu');
    afficherPanneauSimple(panneau, '🤍🐺', 'Trahison silencieuse', `${nom} sera éliminé par le Loup Blanc.`);
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
    ajouterEtapeTimeline('🤍🐺 Loup Blanc', `${nom} sera éliminé.`);
}

// ============================================
// CHIEN-LOUP
// ============================================
function afficherActionChienLoup(joueursDiv, actionsDiv) {
    const nomChien = etat.joueursVivants.find(n => estVivantEtRole(n, ['chien-loup']));
    const panneau = document.getElementById('panneau-phase');
    
    // On vérifie si le Chien-Loup a déjà été prévenu
    if (etat.chienLoupPrevenu) {
        joueursDiv.innerHTML = `<div class="info-selection">Le Chien-Loup a déjà été prévenu.</div>`;
        actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
        return;
    }

    // On marque qu'il a été prévenu
    etat.chienLoupPrevenu = true;

    // On affiche l'écran pour le MJ
    panneau.innerHTML = `
        <div class="phase-nuit">
            <span class="phase-emoji">🐶🐺</span>
            <div class="phase-titre">Le Chien-Loup ouvre un œil</div>
            <div class="phase-description">
                Chuchote à <strong>${nomChien}</strong> :<br>
                "Tu es un Chien-Loup. Au Jour 2, tu écriras ton choix en secret :<br>
                <strong>🧑‍🌾</strong> Rester Villageois ou <strong>🐺</strong> Devenir Loup-Garou."
            </div>
        </div>
    `;
    joueursDiv.innerHTML = '';
    actionsDiv.innerHTML = `<button class="btn-action" onclick="etapeNuitSuivante()">Continuer →</button>`;
    ajouterEtapeTimeline('🐶🐺 Chien-Loup', `A été prévenu de son rôle spécial.`);
}

// ============================================
// VOYANTE / LOUPS / SALVATEUR (STANDARD)
// FIN roles-nuit.js