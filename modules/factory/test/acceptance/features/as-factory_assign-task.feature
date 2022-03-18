Feature: Toute factory - Assigner une tâche

  Background:
    Given des factory existent:
    | id  | nbRobots | maxNumberOfRobotsAllowed | money | nbFoos | nbBars  | nbFoobars |
    | a   | 2        | 30                       | 3     | 6      | 0       | 1         |
    | b   | 2        | 30                       | 3     | 5      | 0       | 5         |
    | c   | 2        | 30                       | 2     | 6      | 0       | 5         |
    | d   | 2        | 30                       | 0     | 1      | 1       | 0         |
    | e   | 2        | 30                       | 0     | 0      | 1       | 0         |
    | f   | 2        | 30                       | 0     | 1      | 0       | 0         |
  
  Scenario Outline: Tâche[Acheter un robot] assignée - Succès
    Given la factory "<factory_id>" a au moins un robot de disponible
    When je tente d'assigner une tâche à la factory "<factory_id>"
    Then la dernière tâche assignée de la factory "<factory_id>" est "BuyRobot"
    Then la factory "<factory_id>" n'a aucun robot de disponible
  Examples:
    | factory_id |
    | a          |
  
  Scenario Outline: Tâche[Acheter un robot] assignée - Échec
    When je tente d'assigner une tâche à la factory "<factory_id>"
    Then la dernière tâche assignée de la factory "<factory_id>" n'est pas "BuyRobot"
  Examples:
    | factory_id |
    | b          |
    | c          |
    | d          |
    | e          |
    | f          |

  Scenario Outline: Tâche[Vendre un foobar] assignée - Succès
    Given la factory "<factory_id>" a au moins un robot de disponible
    When je tente d'assigner une tâche à la factory "<factory_id>"
    Then la dernière tâche assignée de la factory "<factory_id>" est "SellFoobar"
    Then la factory "<factory_id>" n'a aucun robot de disponible
  Examples:
    | factory_id |
    | b          |
    | c          |
  
  Scenario Outline: Tâche[Vendre un foobar] assignée - Échec
    When je tente d'assigner une tâche à la factory "<factory_id>"
    Then la dernière tâche assignée de la factory "<factory_id>" n'est pas "SellFoobar"
  Examples:
    | factory_id |
    | a          |
    | d          |
    | e          |
    | f          |

  Scenario Outline: Tâche[Assembler un foobar] assignée - Succès
    Given la factory "<factory_id>" a au moins un robot de disponible
    When je tente d'assigner une tâche à la factory "<factory_id>"
    Then la dernière tâche assignée de la factory "<factory_id>" est "AssembleFoobar"
    Then la factory "<factory_id>" n'a aucun robot de disponible
  Examples:
    | factory_id |
    | d          |
  
  Scenario Outline: Tâche[Assembler un foobar] assignée - Échec
    When je tente d'assigner une tâche à la factory "<factory_id>"
    Then la dernière tâche assignée de la factory "<factory_id>" n'est pas "AssembleFoobar"
  Examples:
    | factory_id |
    | a          |
    | b          |
    | c          |
    | e          |
    | f          |

  Scenario Outline: Tâche[Miner un foo] assignée - Succès
    Given la factory "<factory_id>" a au moins un robot de disponible
    When je tente d'assigner une tâche à la factory "<factory_id>"
    Then la dernière tâche assignée de la factory "<factory_id>" est "MineFoo"
    Then la factory "<factory_id>" n'a aucun robot de disponible
  Examples:
    | factory_id |
    | e          |

  Scenario Outline: Tâche[Miner un bar] assignée - Succès
    Given la factory "<factory_id>" a au moins un robot de disponible
    When je tente d'assigner une tâche à la factory "<factory_id>"
    Then la dernière tâche assignée de la factory "<factory_id>" est "MineBar"
    Then la factory "<factory_id>" n'a aucun robot de disponible
  Examples:
    | factory_id |
    | f          |