import assert from "node:assert";
import { describe, it } from "node:test";
import { categories, services } from "@/data/services";

describe("Services and Categories Data Integrity", () => {
  it("contains all expected categories", () => {
    assert.strictEqual(categories.length, 9);
    for (const cat of categories) {
      assert.ok(cat.id, "Category ID should be defined");
      assert.ok(cat.en, "Category EN name should be defined");
      assert.ok(cat.sv, "Category SV name should be defined");
    }
  });

  it("ensures every service maps to a valid category", () => {
    const categoryIds = new Set(categories.map((c) => c.id));
    assert.ok(services.length > 0, "Service list should not be empty");
    for (const service of services) {
      assert.ok(categoryIds.has(service.category), `Invalid category ${service.category} for service ${service.id}`);
      assert.ok(service.name.length > 0, "Service name must be non-empty");
      assert.ok(service.address.length > 0, "Service address must be non-empty");
      assert.ok(service.website.startsWith("http"), `Invalid website URL for service ${service.id}`);
    }
  });
});
