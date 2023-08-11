provider "google" {
  credentials = file("path/to/your/credentials.json")
  project     = "your-project-id"
  region      = "us-central1"  # Specify the desired region
}

resource "google_bigtable_instance" "example_instance" {
  project = "your-project-id"
  instance_id = "example-instance"

  cluster {
    location = "us-central1-a"
    num_nodes = 1
    storage_type = "SSD"
  }
}
