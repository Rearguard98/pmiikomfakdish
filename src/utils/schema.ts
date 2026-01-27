/**
 * Schema.org structured data utility functions
 * Generate JSON-LD schemas for SEO and rich snippets
 */

export interface SchemaConfig {
  siteUrl: string;
  siteName: string;
  logoUrl: string;
  description: string;
}

export const defaultConfig: SchemaConfig = {
  siteUrl: "https://pmiikomfakdish.or.id",
  siteName: "PMII Komfakdish",
  logoUrl: "https://pmiikomfakdish.or.id/assets/images/logo-pmii.avif",
  description: "Website Resmi PMII Komisariat Fakultas Dirasat Islamiyah Cabang Ciputat",
};

/**
 * Create Organization schema
 */
export function createOrganizationSchema(overrides = {}) {
  const { "@context": _, ...safeOverrides } = overrides as any;
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PMII Komfakdish",
    "url": defaultConfig.siteUrl,
    "logo": defaultConfig.logoUrl,
    "description": defaultConfig.description,
    "foundingDate": "1960",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Ir. H. Juanda No. 95, UIN Jakarta",
      "addressLocality": "Ciputat",
      "addressRegion": "Banten",
      "postalCode": "15412",
      "addressCountry": "ID",
    },
    "sameAs": [
      "https://www.facebook.com/pmiikomfakdish",
      "https://www.instagram.com/pmiikomfakdish",
      "https://twitter.com/pmiikomfakdish",
    ],
    ...safeOverrides,
  };
}

/**
 * Create BlogPosting/Article schema
 */
export function createArticleSchema(data: {
  title: string;
  description: string;
  image?: string;
  publishDate: Date;
  url: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": data.title,
    "description": data.description,
    "image": data.image || defaultConfig.logoUrl,
    "datePublished": data.publishDate.toISOString(),
    "dateModified": data.publishDate.toISOString(),
    "author": {
      "@type": "Organization",
      "name": data.author || defaultConfig.siteName,
    },
    "publisher": createOrganizationSchema(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": data.url,
    },
  };
}

/**
 * Create Event schema
 */
export function createEventSchema(data: {
  name: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
  image?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": data.name,
    "description": data.description,
    "image": data.image || defaultConfig.logoUrl,
    "startDate": data.startDate.toISOString(),
    "endDate": data.endDate?.toISOString() || data.startDate.toISOString(),
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": data.location || "UIN Jakarta, Ciputat",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jl. Ir. H. Juanda No. 95",
        "addressLocality": "Ciputat",
        "addressRegion": "Banten",
        "postalCode": "15412",
        "addressCountry": "ID",
      },
    },
    "organizer": createOrganizationSchema(),
    "url": data.url,
  };
}

/**
 * Create Person schema
 */
export function createPersonSchema(data: {
  name: string;
  role: string;
  image?: string;
  phone?: string;
  email?: string;
}) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": data.name,
    "jobTitle": data.role,
    "worksFor": createOrganizationSchema(),
  };

  if (data.image) schema.image = data.image;
  if (data.phone) schema.telephone = data.phone;
  if (data.email) schema.email = data.email;

  return schema;
}

/**
 * Create BreadcrumbList schema
 */
export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

/**
 * Create WebSite schema with search action
 */
export function createWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": defaultConfig.siteName,
    "url": defaultConfig.siteUrl,
    "description": defaultConfig.description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${defaultConfig.siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Create LocalBusiness schema
 */
export function createLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    ...createOrganizationSchema(),
    "areaServed": {
      "@type": "Place",
      "name": "Greater Jakarta Area",
    },
    "priceRange": "Free",
  };
}
