"""
    Automatic test done using Selenium.
    To be tested: Ver hecho del arbo campeon
"""

import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class VerHechoArboCampeon(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()
        self.URL = "http://localhost:3000/"
        self.ID_HECHO = '60a5def1f3e86a784482f988'

    def test_ver_hecho(self):
        self.driver.get(self.URL)

        assert "GeoHistoria" in self.driver.title

        time.sleep(3)

        button = self.driver.find_element_by_id(self.ID_HECHO)
        button.click()

        time.sleep(3)
        title = self.driver.find_element_by_id('title')

        assert title is not None


    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()
