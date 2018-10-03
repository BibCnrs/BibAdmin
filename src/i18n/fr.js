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
        secondary_institute: "Institut secondaire",
        main_unit: "Unité principale",
        secondary_unit: "Unités secondaires",
        communities: "Communautés",
        subscription_date: "Date d'inscription",
        expiration_date: "Date d'expiration",
        enable: "active"
      }
    },
    janusAccounts: {
      name: "Comptes Janus",
      fields: {
        login: "login",
        email: "courriel",
        main_institute: "Institut principal",
        secondary_institute: "Institut secondaire",
        janus_unit: "Unité Janus",
        main_unit: "Unités secondaires",
        communities: "Communautés",
        subscription_date: "Date d'inscription",
        expiration_date: "Date d'expiration",
        enable: "active"
      }
    },
    institutes: {
      name: "Instituts thématiques",
      fields: {
        name: "Nom",
        products: "Produits"
      }
    },
    units: {
      name: "Structures",
      fields: {},
      action: {
        accept: "Accepter",
        reject: "Rejeter"
      },
      notification: {
        approved_success: "Commentaire approuvé",
        approved_error: "Erreur: Commentaire non approuvé",
        rejected_success: "Commentaire rejeté",
        rejected_error: "Erreur: Commentaire non rejeté"
      }
    },
    section_cn: {
      name: "Commission scientifiques spécialisées",
      fields: {}
    },
    equipe: {
      name: "Equipe",
      fields: {}
    }
  }
};
