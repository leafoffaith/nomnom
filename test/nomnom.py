# @author: Jason Su <y.su21@ncl.ac.uk>
# @description:
#   This script is a web automated testing script using the Selenium framework and performs a series of tests
#   on the given website located at the specified URL. It checks the presence and correct quantity of specific elements
#   in the website's navigation bar, 'Login' and 'Find Food' links.

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

# Defining constants and variables
URL = "http://localhost:3000/"
WAIT_TIME = 10
SHORT_WAIT_TIME = 3

# Creating Chrome instances
driver = webdriver.Chrome()

# Set timeout time
wait = WebDriverWait(driver, WAIT_TIME)

# Visit the nomnom website
driver.get(URL)

# Wait until the nav element is available
nav_element = wait.until(EC.presence_of_element_located((By.TAG_NAME, "nav")))

# Find the navigation bar logo element
logo_element = nav_element.find_element(By.XPATH, "//img[@alt='']")

# Determining whether a logo exists
assert logo_element is not None

# Find the navigation bar link element
link_elements = nav_element.find_elements(By.TAG_NAME, "a")

# Determining if the number of links is correct
assert len(link_elements) == 5

# Find the navigation bar account icon element
account_element = nav_element.find_element(By.CLASS_NAME, "MuiSvgIcon-root")

# Determine if the account icon exists
assert account_element is not None

# Wait to find and click on the Login link
try:
    login_link_element = wait.until(EC.presence_of_element_located((By.LINK_TEXT, "Login")))
    login_link_element.click()
    print(driver.current_url)
except TimeoutException:
    print("Timeout occurred while waiting for 'Login' link to appear")

# Back to previous page
driver.back()
print(driver.current_url)
# Wait to find and click on the Find Food link
try:
    findfood_link_element = wait.until(EC.presence_of_element_located((By.LINK_TEXT, "Find Food")))
    findfood_link_element.click()
    print(driver.current_url)

except TimeoutException:
    print("Timeout occurred while waiting for 'Find Food' link to appear")

# Back to previous page
driver.back()

# Print the current URL
print(driver.current_url)

print("program successful running")
# Wait a while
driver.implicitly_wait(SHORT_WAIT_TIME)

# Close your browser
driver.quit()

# Defining assertion functions
def assert_element_exists(element, name):
    assert element is not None, f"{name} element does not exist"

# Run the assertion function
assert_element_exists(logo_element, "Logo")
assert_element_exists(account_element, "Account Icon")
assert len(link_elements) == 5, "Number of links is incorrect"

