# Around Town Stockholm

A functional web-app MVP based on the supplied Around Town Stockholm illustrated concept.

## Included

- Swedish and English interface
- Guest entry without an account
- Original-inspired category wheel plus all-category search
- Location permission and distance sorting
- Actionable service cards with telephone, maps and official websites
- Emergency 112/1177 guidance
- Working calculator
- Local notes stored in the browser
- Settings, privacy/support information and mobile bottom navigation
- Installable web-app manifest

## Important MVP limitation

The directory contains a small demonstration dataset built from official public links and selected Stockholm locations. Every record must be formally verified and connected to a maintained data process before a public-service launch.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment

The repository is designed for automatic deployment on Vercel using the Next.js preset. No environment variables are required for this MVP.

## Next production steps

1. Confirm all third-party data reuse terms and location details.
2. Add a secure editorial/admin data workflow.
3. Replace demonstration records with verified imports or formal data partnerships.
4. Add automated tests and user testing on real devices.
5. Decide account, subscription and BankID scope only after the guest MVP is validated.
