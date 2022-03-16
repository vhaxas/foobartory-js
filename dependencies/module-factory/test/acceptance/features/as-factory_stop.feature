Feature: Toute factory - Arrêter

  Background:
    Given des factory existent:
    | id  | nbRobots | maxNumberOfRobotsAllowed |
    | a   | 2        | 30                       |

  Scenario Outline: Arrêt - Succès
    When je tente d'arrêter la factory "<factory_id>"
    Then la factory "<factory_id>" est arrêtée
  Examples:
    | factory_id |
    | a          |