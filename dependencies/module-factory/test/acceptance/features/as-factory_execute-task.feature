Feature: Toute factory - Exécuter une tâche

  Background:
    Given des factory existent:
    | id  | nbRobots | maxNumberOfRobotsAllowed | money | nbFoos | nbBars  | nbFoobars |
    | abc | 2        | 30                       | 3     | 6      | 0       | 1         |
    | def | 29       | 30                       | 3     | 6      | 1       | 2         |
    | ghi | 2        | 30                       | 3     | 5      | 0       | 0         |
    | jkl | 2        | 30                       | 2     | 6      | 2       | 0         |
    | mno | 30       | 30                       | 3     | 6      | 5       | 0         |
    | pqr | 2        | 30                       | 5     | 0      | 0       | 3         |

  Scenario Outline: Tâche[Miner un foo] éxécutée - Succès
    When je tente d'exécuter la tâche "MineFoo" dans la factory "<factory_id>"
    Then la factory "<factory_id>" a <factory_nbFoos> foo
  Examples:
    | factory_id | factory_nbFoos |
    | abc        | 7              |
    | ghi        | 6              |

  Scenario Outline: Tâche[Miner un bar] éxécutée - Succès
    When je tente d'exécuter la tâche "MineBar" dans la factory "<factory_id>"
    Then la factory "<factory_id>" a <factory_nbBars> bar
  Examples:
    | factory_id | factory_nbBars |
    | abc        | 1              |
    | mno        | 6              |
  
  Scenario Outline: Tâche[Assembler un foobar] exécutée - Succès
    Given on réussi toujours à assembler un foobar
    When je tente d'exécuter la tâche "AssembleFoobar" dans la factory "<factory_id>"
    Then la factory "<factory_id>" a <factory_nbFoos> foo
    Then la factory "<factory_id>" a <factory_nbBars> bar
    And la factory "<factory_id>" a <factory_nbFoobars> foobar
  Examples:
    | factory_id | factory_nbFoos | factory_nbBars | factory_nbFoobars |
    | def        | 5              | 0              | 3                 |
    | mno        | 5              | 4              | 1                 |
  
  Scenario Outline: Tâche[Assembler un foobar] exécutée - Échec
    Given on échoue toujours à assembler un foobar
    When je tente d'exécuter la tâche "AssembleFoobar" dans la factory "<factory_id>"
    Then la factory "<factory_id>" a <factory_nbFoos> foo
    Then la factory "<factory_id>" a <factory_nbBars> bar
    And la factory "<factory_id>" a <factory_nbFoobars> foobar
  Examples:
    | factory_id | factory_nbFoos | factory_nbBars | factory_nbFoobars |
    | def        | 5              | 1              | 2                 |
    | mno        | 5              | 5              | 0                 |
  
  Scenario Outline: Tâche[Assembler un foobar] exécutée - Échec - Ressources insuffisantes
    Given on réussi toujours à assembler un foobar
    When je tente d'exécuter la tâche "AssembleFoobar" dans la factory "<factory_id>"
    Then la factory "<factory_id>" a <factory_nbFoos> foo
    Then la factory "<factory_id>" a <factory_nbBars> bar
    And la factory "<factory_id>" a <factory_nbFoobars> foobar
  Examples:
    | factory_id | factory_nbFoos | factory_nbBars | factory_nbFoobars |
    | abc        | 6              | 0              | 1                 |
    | ghi        | 5              | 0              | 0                 |

  Scenario Outline: Tâche[Vendre un foobar] exécutée - Succès
    Given on vend toujours <nbFoobarSelled> foobar
    When je tente d'exécuter la tâche "SellFoobar" dans la factory "<factory_id>"
    Then la factory "<factory_id>" a <factory_money>€
    And la factory "<factory_id>" a <factory_nbFoobars> foobar
  Examples:
    | nbFoobarSelled | factory_id | factory_money | factory_nbFoobars |
    | 1              | abc        | 4             | 0                 |
    | 1              | def        | 4             | 1                 |
    | 2              | pqr        | 7             | 1                 |
    | 3              | pqr        | 8             | 0                 |

  Scenario Outline: Tâche[Vendre un foobar] exécutée - Échec
    Given on vend toujours <nbFoobarSelled> foobar
    When je tente d'exécuter la tâche "SellFoobar" dans la factory "<factory_id>"
    Then la factory "<factory_id>" a <factory_money>€
    And la factory "<factory_id>" a <factory_nbFoobars> foobar
  Examples:
    | nbFoobarSelled | factory_id | factory_money | factory_nbFoobars |
    | 1              | ghi        | 3             | 0                 |

  Scenario Outline: Tâche[Acheter un robot] exécutée - Succès
    When je tente d'exécuter la tâche "BuyRobot" dans la factory "<factory_id>"
    Then la factory "<factory_id>" a <factory_nbRobots> robots
    And la factory "<factory_id>" a <factory_money>€
    And la factory "<factory_id>" a <factory_nbFoos> foo
  Examples:
    | factory_id | factory_nbRobots | factory_money | factory_nbFoos |
    | abc        | 3                | 0             | 0              |
    | def        | 30               | 0             | 0              |

  Scenario Outline: Tâche[Acheter un robot] exécutée - Échec
    When je tente d'exécuter la tâche "BuyRobot" dans la factory "<factory_id>"
    Then la factory "<factory_id>" a <factory_nbRobots> robots
    And la factory "<factory_id>" a <factory_money>€
    And la factory "<factory_id>" a <factory_nbFoos> foo
  Examples:
    | factory_id | factory_nbRobots | factory_money | factory_nbFoos |
    | ghi        | 2                | 3             | 5              |
    | jkl        | 2                | 2             | 6              |
    | mno        | 30               | 3             | 6              |