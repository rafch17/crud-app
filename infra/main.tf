provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = "crud-rg"
  location = "eastus"
}

resource "azurerm_container_registry" "acr" {
  name                = "crudacr${random_integer.rand.result}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = true
}

resource "random_integer" "rand" {
  min = 1000
  max = 9999
}
