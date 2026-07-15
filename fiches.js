// ============================================
function vainqueurDetecte() {
    const loups = etat.joueursVivants.filter((nom) => {
        const role = etat.rolesAttribues[etat.joueurs.indexOf(nom)];
        return role && role.id.includes('loup') && role.id !== 'loup-blanc' && role.id !== 'loup-solitaire' && role.id !== 'loup-fou' && role.id !== 'chien-loup';
    });
    const villageois = etat.joueursVivants.filter((nom) => {
        const role = etat.rolesAttribues[etat.joueurs.indexOf(nom)];
        return role && !role.id.includes('loup');
    });
    const loupSolitaire = etat.joueursVivants.find(nom => {
        const role = etat.rolesAttribues[etat.joueurs.indexOf(nom)];
        return role && role.id === 'loup-solitaire';
    });
    if (loupSolitaire && etat.joueursVivants.length === 1) {
        return '🐺💀 Le Loup-Garou Solitaire a gagné ! Il est le dernier survivant !';
    }

    // SECTAIRE : gagne si tous les survivants sont dans la secte
    const nomSectaire = etat.joueursVivants.find(nom => {
        const role = etat.rolesAttribues[etat.joueurs.indexOf(nom)];
        return role && role.id === 'sectaire';
    });
    if (nomSectaire && etat.membresSecte) {
        const tousDansSecte = etat.joueursVivants.every(n => n === nomSectaire || etat.membresSecte.includes(n));
        if (tousDansSecte && etat.joueursVivants.length > 1) {
            return '🙏 Le Sectaire a gagné ! Toute la communauté restante fait partie de sa secte !';
        }
    }

    // PYROMANE : gagne s'il est le dernier survivant
    const nomPyromane = etat.joueursVivants.find(nom => {
        const role = etat.rolesAttribues[etat.joueurs.indexOf(nom)];
        return role && role.id === 'pyromane';
    });
    if (nomPyromane && etat.joueursVivants.length === 1) {
        return '🔥 Le Pyromane a gagné ! Il est le dernier survivant après l\'incendie !';
    }

    if (loups.length === 0) { return '🎉 Les Villageois ont gagné ! Tous les loups sont éliminés !'; }
    if (loups.length >= villageois.length) { return '🐺 Les Loups-Garous ont gagné ! Ils sont en majorité !'; }
    return null;
}

// ============================================
// FICHES DES RÔLES
// ============================================
const FICHES_ROLES = {
    'villageois': { camp: '🧑‍🌾 Village', pouvoir: 'Aucun pouvoir spécial la nuit.', actionNuit: 'Le Villageois ne se réveille jamais.', actionJour: 'Il participe aux débats et vote pour éliminer un suspect.', objectif: 'Éliminer tous les Loups-Garous.', limites: 'Aucune. C\'est le rôle le plus simple.', mj: 'Rien. Le Villageois ne se réveille pas.', conseil: 'Bien expliquer aux débutants que ce rôle est essentiel et qu\'ils doivent participer activement aux débats.' },
    'voyante': { camp: '🧑‍🌾 Village', pouvoir: 'Chaque nuit, elle peut découvrir la carte d\'identité d\'un joueur.', actionNuit: 'Le MJ réveille la Voyante. Elle désigne un joueur. Le MJ lui montre secrètement sa carte : pouce en l\'air pour un gentil (Villageois, Neutre), pouce en bas pour un Loup-Garou.', actionJour: 'Elle participe aux débats. Elle peut révéler ses informations si elle le souhaite.', objectif: 'Éliminer tous les Loups-Garous.', limites: 'Une seule cible par nuit. Si elle se révèle trop tôt, les loups vont la tuer.', mj: 'Réveiller la Voyante chaque nuit, après le tour des Amoureux et avant le tour des Loups. Montrer la carte en silence.', conseil: 'Ne pas parler quand tu montres la carte.' },
    'sorciere': { camp: '🧑‍🌾 Village', pouvoir: 'Elle possède deux potions : une de vie, une de mort.', actionNuit: 'Le MJ réveille la Sorcière après le tour des Loups. Le MJ montre la victime des loups. Elle peut sauver la victime, ou utiliser sa potion de mort pour tuer quelqu\'un.', actionJour: 'Elle participe aux débats.', objectif: 'Éliminer tous les Loups-Garous.', limites: 'Chaque potion est utilisée une seule fois. Elle ne peut pas utiliser les deux potions la même nuit. Elle ne peut pas se sauver elle-même si elle est la victime des loups.', mj: 'Suivre les potions utilisées. Une fois une potion utilisée, ne plus la proposer. Si les deux potions sont utilisées, ne plus réveiller la Sorcière.', conseil: 'Si elle n\'utilise aucune potion, elle garde ses pouvoirs pour plus tard.' },
    'chasseur': { camp: '🧑‍🌾 Village', pouvoir: 'À sa mort, il tue un joueur de son choix.', actionNuit: 'Aucune. Le Chasseur ne se réveille pas.', actionJour: 'S\'il meurt (vote, poison, attaque des loups), le MJ annonce sa mort, et le Chasseur désigne immédiatement un joueur à tuer.', objectif: 'Éliminer tous les Loups-Garous.', limites: 'Son pouvoir ne fonctionne pas s\'il est éliminé par le coup de foudre des Amoureux. Il doit obligatoirement tuer quelqu\'un, il ne peut pas refuser.', mj: 'Au moment de la mort du Chasseur, lui demander de désigner une cible. Appliquer la mort immédiatement.', conseil: 'Ne pas hésiter à lui laisser le temps de choisir.' },
    'cupidon': { camp: '🧑‍🌾 Village', pouvoir: 'La première nuit, il choisit deux joueurs qui tombent amoureux.', actionNuit: 'Nuit 1 uniquement. Le MJ réveille Cupidon en premier. Cupidon désigne deux joueurs. Le MJ les réveille ensuite pour qu\'ils se reconnaissent.', actionJour: 'Il participe aux débats.', objectif: 'Éliminer tous les Loups-Garous.', limites: 'Pouvoir utilisé une seule fois, la première nuit. Les Amoureux forment un camp à part.', mj: 'Réveiller Cupidon en tout premier. Puis réveiller les deux Amoureux ensemble pour qu\'ils se voient. Ne pas révéler leur rôle l\'un à l\'autre, juste leur identité.', conseil: 'Ne pas oublier de réveiller les Amoureux !' },
    'petite-fille': { camp: '🧑‍🌾 Village', pouvoir: 'Elle peut espionner les loups la nuit.', actionNuit: 'Pendant le tour des Loups, elle peut légèrement entrouvrir les yeux pour regarder qui bouge.', actionJour: 'Elle participe aux débats.', objectif: 'Éliminer tous les Loups-Garous.', limites: 'Si un Loup-Garou la surprend, il lève la main. Le MJ annonce que la Petite Fille est démasquée. Elle meurt immédiatement, à la place de la victime prévue.', mj: 'Surveiller discrètement la Petite Fille pendant le tour des Loups. Si un loup lève la main, valider la mort de la Petite Fille. Ne pas révéler qui l\'a dénoncée.', conseil: 'Jouez l\'ambiance !' },
    'salvateur': { camp: '🧑‍🌾 Village', pouvoir: 'Chaque nuit, il protège un joueur contre les attaques de loups.', actionNuit: 'Le MJ réveille le Salvateur. Il désigne un joueur à protéger (pas lui-même).', actionJour: 'Il participe aux débats.', objectif: 'Éliminer tous les Loups-Garous.', limites: 'Il ne peut pas se protéger lui-même. Il ne peut pas protéger le même joueur deux nuits de suite. Sa protection ne fonctionne que contre les attaques de loups, pas contre le poison.', mj: 'Noter secrètement le joueur protégé. Si les loups attaquent ce joueur, annoncer au matin qu\'il n\'y a pas de mort.', conseil: 'Note bien quel joueur tu as protégé la veille pour ne pas le protéger deux fois de suite.' },
    'ancien': { camp: '🧑‍🌾 Village', pouvoir: 'Il survit à la première attaque des loups.', actionNuit: 'Aucune. L\'Ancien ne se réveille pas.', actionJour: 'Il participe aux débats.', objectif: 'Éliminer tous les Loups-Garous.', limites: 'La protection ne fonctionne qu\'une seule fois et uniquement contre les loups. Si le village le tue (vote, poison, Chasseur), tous les pouvoirs du village disparaissent immédiatement.', mj: 'La première fois que les loups attaquent l\'Ancien, ne pas le déclarer mort. Dire simplement au matin : "L\'Ancien a survécu." Si le village le tue, annoncer que tous les pouvoirs sont perdus.', conseil: 'Très puissant, mais très risqué pour le village.' },
    'idiot': { camp: '🧑‍🌾 Village', pouvoir: 'S\'il est éliminé par le vote, il survit.', actionNuit: 'Aucune. L\'Idiot ne se réveille pas.', actionJour: 'Il participe aux débats et aux votes.', objectif: 'Éliminer tous les Loups-Garous.', limites: 'Après avoir survécu, il perd définitivement son droit de vote pour toutes les éliminations suivantes. Il peut toujours parler.', mj: 'Si le village vote pour l\'Idiot, le MJ lui demande de révéler sa carte. Il survit. Le MJ annonce qu\'il ne peut plus voter.', conseil: 'Ce rôle est parfait pour les joueurs qui aiment bluffer.' },
    'deux-soeurs': { camp: '🧑‍🌾 Village', pouvoir: 'Elles se reconnaissent la première nuit.', actionNuit: 'Nuit 1 uniquement. Le MJ réveille les deux Sœurs ensemble. Elles se voient.', actionJour: 'Elles participent aux débats.', objectif: 'Éliminer tous les Loups-Garous.', limites: 'Aucun pouvoir spécial à part la connaissance mutuelle. Ce sont de simples Villageoises.', mj: 'Réveiller les deux Sœurs juste après les Amoureux la première nuit.', conseil: 'Elles peuvent communiquer en secret pour s\'entraider.' },
    'trois-freres': { camp: '🧑‍🌾 Village', pouvoir: 'Ils se reconnaissent la première nuit.', actionNuit: 'Nuit 1 uniquement. Le MJ réveille les trois Frères ensemble. Ils se voient.', actionJour: 'Ils participent aux débats.', objectif: 'Éliminer tous les Loups-Garous.', limites: 'Aucun pouvoir spécial à part la connaissance mutuelle. Ce sont de simples Villageois.', mj: 'Réveiller les trois Frères juste après les Amoureux la première nuit.', conseil: 'Ils peuvent se coordonner en secret.' },
    'renard': { camp: '🧑‍🌾 Village', pouvoir: 'Chaque nuit, il renifle un groupe de 3 joueurs voisins.', actionNuit: 'Le MJ réveille le Renard. Il désigne un groupe de 3 joueurs assis côte à côte. Le MJ fait un signe positif s\'il y a au moins un Loup-Garou dans le groupe, négatif sinon.', actionJour: 'Il participe aux débats.', objectif: 'Éliminer tous les Loups-Garous.', limites: 'Si un joueur du dernier groupe reniflé meurt, le Renard perd définitivement son pouvoir. Il ne se réveille plus jamais.', mj: 'Noter le dernier groupe reniflé. Dès qu\'un joueur de ce groupe meurt, ne plus réveiller le Renard. Les signes doivent être discrets et silencieux.', conseil: 'Le Renard joue avec le feu à chaque fois.' },
    'ours': { camp: '🧑‍🌾 Village', pouvoir: 'Ses deux voisins sont surveillés par un ours.', actionNuit: 'Aucune. Le Montreur d\'Ours ne se réveille jamais.', actionJour: 'Il participe aux débats.', objectif: 'Éliminer tous les Loups-Garous.', limites: 'Aucune action possible. L\'information est publique.', mj: 'Chaque matin, avant d\'annoncer les morts, vérifier les deux voisins du Montreur d\'Ours. Si au moins un est Loup-Garou, annoncer : "L\'ours grogne !"', conseil: 'C\'est une information publique précieuse.' },
    'chevalier': { camp: '🧑‍🌾 Village', pouvoir: 'S\'il est tué par les loups, il empoisonne le premier loup à sa gauche.', actionNuit: 'Aucune. Le Chevalier ne se réveille pas.', actionJour: 'Il participe aux débats.', objectif: 'Éliminer tous les Loups-Garous.', limites: 'Le pouvoir ne fonctionne que s\'il est tué par les loups. Pas en cas de vote, de poison, ou de Chasseur.', mj: 'Si le Chevalier est tué par les loups, identifier le premier loup à sa gauche. Annoncer sa mort la nuit suivante.', conseil: 'Le loup empoisonné ne le sait pas avant de mourir.' },
    'enfant-sauvage': { camp: '🧑‍🌾 Village (peut devenir 🐺 Loup)', pouvoir: 'Il choisit un modèle. Si le modèle meurt, il devient Loup-Garou.', actionNuit: 'Nuit 1 : le MJ le réveille. Il désigne son modèle. Si le modèle meurt, la nuit suivante, le MJ le réveille et l\'informe qu\'il est devenu Loup-Garou.', actionJour: 'Il participe aux débats.', objectif: 'Gagner avec le village tant que le modèle est vivant. Puis gagner avec les loups.', limites: 'Le choix du modèle est définitif. La transformation est irréversible.', mj: 'Suivre l\'état du modèle. Informer l\'Enfant Sauvage de sa transformation la nuit suivant la mort du modèle.', conseil: 'L\'Enfant Sauvage doit faire attention à ne pas trop protéger son modèle.' },
    'villageois-villageois': { camp: '🧑‍🌾 Village', pouvoir: 'Il possède une seconde vie.', actionNuit: 'Aucune. Le Villageois-Villageois ne se réveille pas.', actionJour: 'Il participe aux débats.', objectif: 'Éliminer tous les Loups-Garous.', limites: 'La seconde vie ne fonctionne qu\'une seule fois.', mj: 'La première fois qu\'il meurt (nuit ou jour), le MJ lui demande de retourner sa carte. Il révèle son rôle et survit.', conseil: 'Très discret, mais très puissant.' },
    'comedien': { camp: '🧑‍🌾 Village', pouvoir: 'Il est lié à un Original. Tant que l\'Original vit, il est immortel la nuit. Si l\'Original meurt, il récupère son rôle.', actionNuit: 'Nuit 1 : le MJ lui désigne silencieusement l\'Original. Si l\'Original meurt, la nuit suivante, le MJ le réveille et lui chuchote son nouveau rôle.', actionJour: 'Il participe aux débats.', objectif: 'Éliminer tous les Loups-Garous.', limites: 'Il ne connaît pas le rôle de l\'Original. Si l\'Original meurt sans pouvoir spécial, il reste simple Villageois.', mj: 'Chuchoter discrètement lors du réveil. Ne jamais révéler le nom de l\'Original à voix haute. Gérer la transition de rôle en silence.', conseil: 'Le rôle le plus complexe à gérer pour le MJ.' },
    'loup-garou': { camp: '🐺 Loups', pouvoir: 'Chaque nuit, il vote avec les autres loups pour tuer un villageois.', actionNuit: 'Le MJ réveille tous les Loups-Garous ensemble. Ils se mettent d\'accord en silence sur une victime.', actionJour: 'Il se fait passer pour un villageois. Il ment et accuse les autres.', objectif: 'Éliminer tous les villageois.', limites: 'Aucune communication verbale la nuit.', mj: 'Réveiller les loups après la Voyante. Noter la victime choisie.', conseil: 'Le rôle de base des méchants.' },
    'grand-mechant-loup': { camp: '🐺 Loups', pouvoir: 'Une nuit sur deux, il peut tuer une seconde victime.', actionNuit: 'Il participe au vote collectif. Ensuite, une nuit sur deux, le MJ le réveille seul. Il désigne une seconde victime.', actionJour: 'Il se fait passer pour un villageois.', objectif: 'Éliminer tous les villageois.', limites: 'Le pouvoir est perdu dès qu\'un autre loup meurt.', mj: 'Vérifier si un loup est mort avant d\'appeler le Grand Méchant Loup. Ne pas le réveiller si un loup est déjà mort.', conseil: 'Un loup très dangereux.' },
    
    // ===============================================================
    // MISE À JOUR DE L'INFECT PÈRE DES LOUPS (Mécanique modifiée)
    // ===============================================================
    'infect-pere': { 
        camp: '🐺 Loups', 
        pouvoir: 'Une fois par partie, il contamine un villageois vivant qui devient Loup-Garou.', 
        actionNuit: 'Au lieu de voter pour tuer, le groupe des Loups-Garous désigne une victime qui est éliminée. Puis, l\'Infect désigne secrètement une autre personne vivante pour la contaminer (hors rôles spéciaux).', 
        actionJour: 'Il se fait passer pour un villageois.', 
        objectif: 'Éliminer tous les villageois.', 
        limites: 'Pouvoir utilisable une seule fois. Ne fonctionne pas sur les rôles spéciaux (Voyante, Sorcière...) ni sur le Grand Méchant Loup.', 
        mj: 'La nuit suivant la contamination, réveiller le nouveau loup et l\'informer. Il rejoint le clan. La victime des loups meurt en premier, la contamination a lieu sur une autre personne.', 
        conseil: 'L\'infection se fait en silence. Demandez à l\'Infect de vous montrer du doigt sa cible pour que les autres loups ne sachent pas qui il a choisi.' 
    },

    'loup-blanc': { camp: '⚖️ Neutre (joue avec les loups au début)', pouvoir: 'Une nuit sur deux, il tue un autre Loup-Garou.', actionNuit: 'Il participe au vote collectif. Ensuite, une nuit sur deux, le MJ le réveille seul. Il tue un Loup-Garou.', actionJour: 'Il se fait passer pour un villageois.', objectif: 'Être le seul survivant.', limites: 'Tant qu\'il est vivant, les loups ne peuvent pas gagner.', mj: 'Gérer secrètement ses attaques contre les loups. Ne pas révéler son existence aux autres loups.', conseil: 'Un traître au sein même du clan.' },
    'loup-fou': { camp: '🐺 Loups', pouvoir: 'Une fois par partie, il impose sa propre victime.', actionNuit: 'Pendant le tour des loups, il peut ignorer le vote collectif et désigner une victime seul.', actionJour: 'Il se fait passer pour un villageois.', objectif: 'Éliminer tous les villageois.', limites: 'Pouvoir utilisable une seule fois.', mj: 'Si le Loup Fou utilise son pouvoir, ignorer le vote collectif. Valider sa victime.', conseil: 'Imprévisible et chaotique.' },
    'joueur-flute': { camp: '⚖️ Neutre', pouvoir: 'Chaque nuit, il charme 2 joueurs.', actionNuit: 'Le MJ réveille le Joueur de Flûte. Il désigne 2 joueurs à charmer. Le MJ note les charmés.', actionJour: 'Il se fait passer pour un villageois.', objectif: 'Charmer tous les survivants. S\'il y parvient, il gagne seul.', limites: 'Les charmés ne savent pas qui d\'autre est charmé.', mj: 'Tenir une liste des charmés. Vérifier après chaque élimination si tous les survivants sont charmés. Si oui, annoncer la victoire du Joueur de Flûte.', conseil: 'Un rôle qui se joue dans l\'ombre.' },
    'loup-solitaire': { camp: '⚖️ Neutre', pouvoir: 'Une nuit sur deux, il tue un Loup-Garou.', actionNuit: 'Une nuit sur deux, le MJ le réveille seul après le tour des loups. Il tue un Loup-Garou.', actionJour: 'Il se fait passer pour un villageois.', objectif: 'Être le dernier survivant.', limites: 'Il ne participe jamais au vote collectif des loups.', mj: 'Ne jamais le réveiller avec le clan. Gérer ses attaques en secret.', conseil: 'Un loup qui veut tout pour lui.' },
    'bouc': { camp: '⚖️ Neutre', pouvoir: 'S\'il est exécuté par le vote, il gagne seul.', actionNuit: 'Aucune. Le Bouc-Émissaire ne se réveille pas.', actionJour: 'Il participe aux débats en essayant de se faire voter sans éveiller les soupçons.', objectif: 'Être exécuté par le vote du village.', limites: 'S\'il meurt la nuit ou par poison, il perd et devient un simple Villageois.', mj: 'Si le Bouc-Émissaire est éliminé par le vote, annoncer immédiatement sa victoire. La partie s\'arrête.', conseil: 'Un rôle qui demande du bluff.' },
    'ange': { camp: '⚖️ Neutre', pouvoir: 'S\'il est exécuté le premier jour, il gagne seul.', actionNuit: 'Aucune. L\'Ange ne se réveille pas.', actionJour: 'Il participe aux débats du premier jour en essayant de se faire voter.', objectif: 'Être exécuté par le vote du premier jour.', limites: 'S\'il survit au premier jour, il devient un simple Villageois.', mj: 'Si l\'Ange est éliminé le Jour 1, annoncer immédiatement sa victoire. La partie s\'arrête. Sinon, il devient Villageois.', conseil: 'Une victoire éclair.' },
    'loup-voyou': { camp: '🐺 Loups', pouvoir: 'Chaque nuit, il tente de tuer un Villageois sans pouvoir.', actionNuit: 'Il participe au vote collectif. Ensuite, le MJ le réveille seul. Il désigne un joueur. Si ce joueur est un simple Villageois (ou Sœur/Frère), il le tue. Sinon, le pouvoir échoue.', actionJour: 'Il se fait passer pour un villageois.', objectif: 'Éliminer tous les villageois.', limites: 'Ne fonctionne que sur les Villageois sans pouvoir.', mj: 'Vérifier secrètement le rôle du joueur ciblé. S\'il est sans pouvoir, ajouter sa mort. Sinon, ne rien faire.', conseil: 'Un loup qui s\'attaque aux faibles.' },
    'loup-alpha': { camp: '🐺 Loups', pouvoir: 'Son vote compte double lors du choix de la victime.', actionNuit: 'Il participe au vote collectif. Sa voix compte pour deux. Si égalité, c\'est lui qui décide.', actionJour: 'Il se fait passer pour un villageois.', objectif: 'Éliminer tous les villageois.', limites: 'Aucune.', mj: 'Compter double le vote de l\'Alpha. En cas d\'égalité, lui demander de trancher.', conseil: 'Le chef de meute.' },
    'loup-fetiche': { camp: '🐺 Loups', pouvoir: 'Chaque nuit, il protège un autre Loup-Garou contre les attaques neutres.', actionNuit: 'Après le tour des loups, le MJ le réveille seul. Il désigne un autre Loup-Garou à protéger.', actionJour: 'Il se fait passer pour un villageois.', objectif: 'Éliminer tous les villageois.', limites: 'Ne peut pas se protéger lui-même. La protection ne fonctionne que contre le Loup Blanc et le Loup Solitaire.', mj: 'Si un neutre attaque le loup protégé, annuler la mort.', conseil: 'Un loup qui protège les siens.' },
    'chien-loup': { camp: '🧑‍🌾 Village OU 🐺 Loups (choix en cours de partie)', pouvoir: 'Au jour 2 ou 3, il choisit de rester Villageois ou de devenir Loup-Garou.', actionNuit: 'Aucune avant sa transformation. S\'il devient loup, il rejoint le clan.', actionJour: 'Le MJ annonce le moment du choix. Le Chien-Loup écrit son choix sur un papier.', objectif: 'Selon son choix final.', limites: 'Le choix est définitif et secret.', mj: 'Annoncer le moment du choix. Récupérer le papier. Informer le joueur de son nouveau statut la nuit suivante si nécessaire.', conseil: 'Un rôle qui peut basculer la partie.' },

    'corbeau': { camp: '🧑‍🌾 Village', pouvoir: 'Chaque nuit, il maudit un joueur qui aura deux voix contre lui au vote du lendemain.', actionNuit: 'Le MJ réveille le Corbeau. Il désigne un joueur à maudire.', actionJour: 'Il participe aux débats.', objectif: 'Éliminer tous les Loups-Garous.', limites: 'Ne peut pas maudire le même joueur deux nuits de suite.', mj: 'Placer un jeton discret devant le joueur maudit. Compter sa voix comme double au vote suivant.', conseil: 'Le Corbeau peut changer l\'issue d\'un vote.' },
    'juge-corrompu': { camp: '🧑‍🌾 Village', pouvoir: 'Une fois par partie, il impose un candidat unique au vote.', actionNuit: 'Aucune. Le Juge Corrompu ne se réveille pas.', actionJour: 'Il peut se lever pendant le débat et désigner un joueur. Le village vote pour ou contre ce joueur uniquement.', objectif: 'Éliminer tous les Loups-Garous.', limites: 'Pouvoir utilisable une seule fois.', mj: 'Quand le Juge se lève, arrêter les débats et organiser un vote pour/contre le joueur désigné.', conseil: 'Un pouvoir qui peut sauver ou perdre le village.' },
    'meunier': { camp: '🧑‍🌾 Village', pouvoir: 'S\'il est éliminé par vote, son rôle n\'est pas révélé.', actionNuit: 'Aucune. Le Meunier ne se réveille pas.', actionJour: 'Il participe aux débats.', objectif: 'Éliminer tous les Loups-Garous.', limites: 'L\'effet ne fonctionne que pour une élimination par vote, pas en cas de mort de nuit.', mj: 'Si le Meunier est voté, annoncer simplement "Le joueur est éliminé." sans révéler sa carte.', conseil: 'Parfait pour semer le doute dans le village.' },
    'garde-champetre': { camp: '🧑‍🌾 Village', pouvoir: 'Chaque nuit, il empêche deux joueurs de voter l\'un contre l\'autre le lendemain.', actionNuit: 'Le MJ réveille le Garde Champêtre. Il désigne deux joueurs.', actionJour: 'Il participe aux débats.', objectif: 'Éliminer tous les Loups-Garous.', limites: 'Les deux joueurs désignés ne peuvent pas voter l\'un contre l\'autre le jour suivant.', mj: 'Au moment du vote, refuser si l\'un des deux protégés tente de voter contre l\'autre.', conseil: 'Un rôle stratégique pour protéger ses alliés.' },
    'detective': { camp: '🧑‍🌾 Village', pouvoir: 'Chaque nuit, il vérifie le camp d\'un joueur (Village ou non-Village).', actionNuit: 'Le MJ réveille le Détective. Il désigne un joueur. Le MJ indique simplement "Village" ou "non-Village".', actionJour: 'Il participe aux débats.', objectif: 'Éliminer tous les Loups-Garous.', limites: 'Il ne connaît pas le rôle exact, seulement le camp. Les rôles Neutres comptent comme "non-Village".', mj: 'Signe positif = Villageois. Signe négatif = Loup ou Neutre. Rester discret.', conseil: 'Moins précis que la Voyante, mais très utile en complément.' },
    'enqueteur': { camp: '🧑‍🌾 Village', pouvoir: 'Chaque nuit, il découvre un rôle qui n\'est PAS présent dans la partie.', actionNuit: 'Le MJ réveille l\'Enquêteur. Il désigne un joueur. Le MJ lui montre un rôle qui n\'est pas distribué dans cette partie.', actionJour: 'Il participe aux débats.', objectif: 'Éliminer tous les Loups-Garous.', limites: 'Ne révèle jamais le vrai rôle, seulement ce que le joueur N\'EST PAS.', mj: 'Préparer une liste de rôles hors-jeu avant la partie. En montrer un au hasard, différent à chaque fois si possible.', conseil: 'Un rôle subtil, parfait pour les joueurs expérimentés.' },
    'sorciere-salem': { camp: '🧑‍🌾 Village', pouvoir: 'Elle possède trois potions : vie, mort, et vérité.', actionNuit: 'Le MJ la réveille après les Loups. Elle peut utiliser UNE potion par nuit (vie, mort, ou vérité).', actionJour: 'Le joueur ciblé par la potion de vérité doit révéler sa carte au matin suivant.', objectif: 'Éliminer tous les Loups-Garous.', limites: 'Chaque potion est utilisable une seule fois. Une seule potion par nuit maximum.', mj: 'Gérer les trois potions séparément. Annoncer la révélation au matin si la potion de vérité a été utilisée.', conseil: 'Très puissante, mais chaque potion ne s\'utilise qu\'une fois — bien réfléchir avant.' },
    'pretre': { camp: '🧑‍🌾 Village', pouvoir: 'Il peut bénir le couple d\'Amoureux pour briser le lien de mort qui les unit.', actionNuit: 'Nuit 1 uniquement, après Cupidon. Il peut bénir le couple d\'Amoureux.', actionJour: 'Il participe aux débats.', objectif: 'Éliminer tous les Loups-Garous.', limites: 'Pouvoir utilisable une seule fois.', mj: 'Si le couple est béni et que l\'un des deux meurt, ne pas tuer l\'autre par effet du lien amoureux.', conseil: 'Un rôle qui change complètement la donne pour les Amoureux.' },

    'voleur': { camp: '⚖️ Neutre', pouvoir: 'Chaque nuit, il vole le rôle d\'un joueur. Le joueur volé devient simple Villageois.', actionNuit: 'Le MJ le réveille. Il désigne un joueur. Le MJ échange secrètement les rôles.', actionJour: 'Il joue avec son nouveau rôle.', objectif: 'Variable selon le rôle volé.', limites: 'Ne peut pas voler un Loup-Garou ni voler le même joueur deux fois.', mj: 'Échanger secrètement les rôles dans le suivi du MJ. Informer le joueur volé de son nouveau statut (simple Villageois) la nuit suivante.', conseil: 'Un rôle très versatile qui peut tout changer.' },
    'sectaire': { camp: '⚖️ Neutre', pouvoir: 'Chaque nuit, il recrute un joueur dans sa secte. Il gagne si tous les survivants sont dans la secte.', actionNuit: 'Le MJ le réveille. Il désigne un joueur à recruter.', actionJour: 'Il se fait passer pour un villageois.', objectif: 'Que tous les survivants soient dans la secte.', limites: 'Les membres de la secte ne se connaissent pas entre eux. Si le Sectaire meurt, la secte est dissoute.', mj: 'Tenir la liste des membres recrutés. Vérifier après chaque mort si tous les survivants sont dans la secte. Si le Sectaire meurt, annuler la secte.', conseil: 'Un rôle qui grandit dans l\'ombre, tour après tour.' },
    'pyromane': { camp: '⚖️ Neutre', pouvoir: 'Chaque nuit, il arrose 2 joueurs d\'essence. Une fois par partie, il peut tout enflammer.', actionNuit: 'Le MJ le réveille. Il désigne 2 joueurs à arroser, OU utilise son pouvoir unique pour enflammer tous les joueurs déjà arrosés.', actionJour: 'Il se fait passer pour un villageois.', objectif: 'Être le dernier survivant.', limites: 'L\'allumage est unique et définitif. Il peut lui-même avoir été arrosé et donc mourir dans l\'explosion.', mj: 'Tenir la liste des joueurs arrosés. Lors de l\'allumage, annoncer toutes les morts d\'un coup.', conseil: 'Le chaos incarné — un seul geste peut renverser toute la partie.' },

    'amoureux': { camp: '💔 Amoureux (camp à part)', pouvoir: 'Aucun pouvoir spécial. Leur lien est leur force et leur faiblesse.', actionNuit: 'Nuit 1 : réveillés juste après Cupidon pour se reconnaître mutuellement.', actionJour: 'Ils participent aux débats. Ils ne peuvent pas voter l\'un contre l\'autre.', objectif: 'Être les deux seuls survivants à la fin de la partie.', limites: 'Si l\'un des deux meurt (quelle que soit la cause), l\'autre se suicide immédiatement de chagrin.', mj: 'Réveiller les deux Amoureux ensemble juste après Cupidon. Appliquer systématiquement le suicide si l\'un des deux meurt.', conseil: 'Un amour qui peut coûter la vie aux deux à la fois.' },
    'amant-delaisse': { camp: '💔 Amoureux (camp à part)', pouvoir: 'Il est secrètement amoureux d\'un des deux Amoureux désignés par Cupidon.', actionNuit: 'Nuit 1, après les Amoureux : il voit les deux Amoureux et en choisit secrètement un comme son amour.', actionJour: 'Il participe aux débats et essaie de protéger discrètement son amour secret.', objectif: 'Survivre jusqu\'à la fin avec la personne qu\'il aime secrètement.', limites: 'L\'amour est à sens unique : l\'Amoureux choisi ne sait rien de ce lien.', mj: 'Noter l\'aimé(e) choisi(e) en secret. Si cette personne meurt, l\'Amant Délaissé se suicide à son tour.', conseil: 'Un amour caché qui ajoute une dimension tragique supplémentaire.' },
};

function afficherFichesRoles() {
    const liste = document.getElementById('liste-fiches-roles');
    let html = '';

    // On ne garde que les rôles réellement sélectionnés dans cette partie
    const idsPresents = Object.entries(etat.rolesSelectionnes || {})
        .filter(([id, qte]) => qte > 0)
        .map(([id]) => id);

    if (idsPresents.length === 0) {
        liste.innerHTML = `<div style="color:var(--beige); font-style:italic; text-align:center; padding:1rem;">Aucun rôle sélectionné pour l'instant.</div>`;
        document.getElementById('modale-fiches').style.display = 'flex';
        return;
    }

    idsPresents.forEach(id => {
        const fiche = FICHES_ROLES[id];
        if (!fiche) return; // pas de fiche dispo pour ce rôle
        const roleData = trouverRole(id);
        const emoji = roleData ? roleData.emoji : '❓';
        const nom = roleData ? roleData.nom : id;
        html += `
            <div class="fiche-role">
                <div class="fiche-role-titre">
                    <span>${emoji} ${nom}</span>
                    <span class="fiche-role-camp">${fiche.camp}</span>
                </div>
                <div class="fiche-role-detail"><span>Pouvoir :</span> ${fiche.pouvoir}</div>
                <div class="fiche-role-detail"><span>Action la nuit :</span> ${fiche.actionNuit}</div>
                <div class="fiche-role-detail"><span>Action le jour :</span> ${fiche.actionJour}</div>
                <div class="fiche-role-detail"><span>Objectif :</span> ${fiche.objectif}</div>
                <div class="fiche-role-limite">⚠️ ${fiche.limites}</div>
                <div class="fiche-role-mj"><span>👑 MJ :</span> ${fiche.mj}</div>
                <div class="fiche-role-mj" style="border-left-color: #6BAF6B; margin-top: 0.4rem;"><span>💡 Conseil :</span> ${fiche.conseil}</div>
            </div>
        `;
    });

    if (html === '') {
        html = `<div style="color:var(--beige); font-style:italic; text-align:center; padding:1rem;">Aucune fiche disponible pour les rôles sélectionnés.</div>`;
    }

    liste.innerHTML = html;
    document.getElementById('modale-fiches').style.display = 'flex';
}

function fermerModaleFiches() {
    document.getElementById('modale-fiches').style.display = 'none';
}// FIN fiches.js