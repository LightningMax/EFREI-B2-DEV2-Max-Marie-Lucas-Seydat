# EFREI-B2-DEV2-Max-Marie-Lucas-Seydat

## Structure du projet 
```
├── README.md
├── backend
├── database
├── docs
└── frontend
```

## Documentation API

|        Action       | Méthode |        Endpoint         |
|---------------------|---------|-------------------------|
|   Liste des tâches  |   GET   |      ``/api/tasks``     |
|      Une tâche      |   GET   |    ``/api/tasks/:id``   |
|       Créer         |   POST  |      ``/api/tasks``     |
|      Modifier       |   PUT   |    ``/api/tasks/:id``   |
| Marquer comme faite |  PATCH  | ``/api/tasks/:id/done`` |
|      Supprimer      |  DELETE |    ``/api/tasks/:id``   |
