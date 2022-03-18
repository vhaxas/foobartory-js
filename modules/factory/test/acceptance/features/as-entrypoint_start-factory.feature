Feature: Tout point d'entrée - Démarrer la factory

  Scenario Outline: Démarrage réussi
    When je tente de démarrer la factory avec initialement <input_nbRobots> robots et un maximum autorisé de <input_maxNumberOfRobotsAllowed> robots
    Then la factory a démarrée
    And la factory a <factory_nbRobots> robots
    And la factory ne peut contenir que <factory_maxNumberOfRobotsAllowed> robots maximum
  Examples:
    | input_nbRobots | input_maxNumberOfRobotsAllowed | factory_nbRobots | factory_maxNumberOfRobotsAllowed |
    | 2              | 30                             | 2                | 30                               |
    | 1              | 10                             | 1                | 10                               |