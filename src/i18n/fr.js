import frenchMessages from "ra-language-french";

export default {
  ...frenchMessages,
  "Not Found": "Contenu non trouvé",
  Unauthorized: "Accès non autorisé",
  "Internal Server Error": "Erreur interne",
  "Failed to fetch": "Impossible de récupérer les données",
  pos: {
    search: "Rechercher",
    configuration: "Configuration",
    language: "Langue",
    theme: {
      name: "Theme",
      light: "Clair",
      dark: "Obscur"
    }
  },
  resources: {
    adminUsers: {
      name: "Administrateurs",
      fields: {
        id: "id",
        login: "login"
      }
    },
    inistAccounts: {
      name: "Comptes INIST",
      fields: {
        username: "login",
        password: "password",
        name: "nom",
        firstname: "prénom",
        email: "courriel",
        main_institute: "Institut principal",
        institutes: "Institut secondaire",
        main_unit: "Unité principale",
        units: "Unités secondaires",
        communities: "Toutes les communautés",
        subscription_date: "Date d'inscription",
        expiration_date: "Date d'expiration",
        enable: "active"
      }
    },
    janusAccounts: {
      name: "Comptes Janus",
      fields: {
        uid: "Uid",
        email: "courriel",
        main_institute: "Institut Janus",
        additional_institutes: "Institut secondaire",
        primary_unit: "Unité Janus",
        additional_units: "Unités secondaires",
        all_communities: "Toutes les communautés",
        last_connexion: "Dernière connexion",
        first_connexion: "Première connexion",
        enable: "active"
      }
    },
    institutes: {
      name: "Instituts",
      fields: {
        id: "id",
        code: "Code",
        name: "Nom",
        communities: "Communautés"
      }
    },
    units: {
      name: "Unités",
      fields: {
        code: "Code",
        name: "Nom",
        main_institute: "Institut principal",
        institutes: "Institut secondaire",
        nb_inist_account: "Nombre de compte Inist",
        nb_janus_account: "Nombre de compte Janus",
        communities: "Communautés",
        section_cn: "Sections",
        enable: "active"
      }
    },
    communities: {
      name: "Communautés",
      fields: {
        name: "Nom",
        gate: "Portail ezproxy",
        user_id: "User Id",
        profile: "Profil",
        ebsco: "Ebsco"
      }
    },
    databases: {
      name: "Base de données",
      fields: {
        name_fr: "Nom (fr)",
        name_en: "Nom (en)",
        active: "Active"
      }
    },
    section_cn: {
      name: "Sections du comité national",
      fields: {
        name: "Nom",
        code: "Code"
      }
    },
    equipe: {
      name: "Equipe",
      fields: {}
    },
    notification: {
      approved_success: "Commentaire approuvé",
      approved_error: "Erreur: Commentaire non approuvé",
      rejected_success: "Commentaire rejeté",
      rejected_error: "Erreur: Commentaire non rejeté"
    }
  }
};
