Feature: Toute factory - Déplacer un robot vers une station de travail

  Background:
    Given des factory existent:
    | id  | nbRobots | maxNumberOfRobotsAllowed |
    | abc | 0        | 2                        |
    And des robots existent:
    | id  | factory_id |
    | abc | abc        |

  Scenario Outline: Déplacement réussi
    Given le robot "<robot_id>" de la factory "<factory_id>" a une tâche assignée
    When la factory "<factory_id>" tente de déplacer le robot "<robot_id>" vers une station de travail
    Then le robot "<robot_id>" de la factory "<factory_id>" se déplace
  Examples:
    | factory_id | robot_id |
    | abc        | abc      |

  Scenario Outline: Déplacement échoué
    When la factory "<factory_id>" tente de déplacer le robot "<robot_id>" vers une station de travail
    Then le robot "<robot_id>" de la factory "<factory_id>" ne se déplace pas
  Examples:
    | factory_id | robot_id |
    | abc        | abc      |