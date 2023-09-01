terraform {
  required_version = ">= 1.3"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 3.3"
    }
  }
}

provider "google" {
  project = "keiko-gcp"
}

resource "google_cloud_run_service" "run_service" {
  name     = "core"
  location = "us-east1"
  autogenerate_revision_name = true

  template {
    spec {
      containers {
        image = "gcr.io/keiko-gcp/core:tag"
      }
    }
  }
  lifecycle {
    create_before_destroy = true
  }
}

resource "google_project_service" "run_api" {
  service            = "run.googleapis.com"
  disable_on_destroy = true
}
