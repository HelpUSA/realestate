import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import bcrypt from 'bcryptjs';

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL || 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seed with map coordinates...');

  // Clean existing data
  await prisma.favorite.deleteMany();
  await prisma.leadInquiry.deleteMany();
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();

  const defaultPasswordHash = await bcrypt.hash('123456', 10);
  const adminPasswordHash = await bcrypt.hash('admin123', 10);

  // 1. Create Super Admin (HelpUS Account)
  const superAdmin = await prisma.user.create({
    data: {
      name: 'HelpUS Administrador',
      email: 'helpus.ecommerce@gmail.com',
      password: adminPasswordHash,
      role: 'ADMIN',
      status: 'ACTIVE',
      phone: '(83) 99872-1848',
      whatsapp: '5583998721848',
      bio: 'Super Administrador da Plataforma HelpUS RealEstate.',
      avatarUrl: '/helpus_logo.png',
    },
  });

  // 1b. Create Admin / Developer
  const admin = await prisma.user.create({
    data: {
      name: 'Admin Desenvolvedor',
      email: 'admin@imoveis.com',
      password: adminPasswordHash,
      role: 'ADMIN',
      status: 'ACTIVE',
      phone: '(83) 99999-0000',
      whatsapp: '5583999990000',
      bio: 'Administrador geral da plataforma guarda-chuva de corretores de imóveis.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
  });

  // 2. Create Realtor Dany Lima (danyimoveisjp)
  const dany = await prisma.user.create({
    data: {
      name: 'Dany Lima',
      email: 'dany@imoveis.com',
      password: defaultPasswordHash,
      role: 'CORRETOR',
      status: 'ACTIVE',
      creci: 'CRECI 19500 PB',
      agencyName: 'DNA Imóveis Bessa',
      phone: '(83) 99862-4667',
      whatsapp: '5583998624667',
      bio: 'Sou corretora de imóveis e ajudo pessoas a realizarem o sonho de um novo lar. Especialista no Bessa e região em João Pessoa - PB. Responsável, dedicada, empática e com alto conhecimento de mercado.',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      coverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    },
  });

  // 3. Create Realtor Waleska (Broker)
  const waleska = await prisma.user.create({
    data: {
      name: 'Waleska Corretora',
      email: 'waleska@imoveis.com',
      password: defaultPasswordHash,
      role: 'CORRETOR',
      status: 'ACTIVE',
      creci: 'CRECI 8492-F PB',
      agencyName: 'Waleska Imóveis Luxo',
      phone: '(83) 99823-4567',
      whatsapp: '5583998234567',
      bio: 'Corretora credenciada no ecossistema HelpUS com atendimento personalizado para imóveis de alto padrão.',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      coverUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    },
  });

  // 4. Create Realtor Carlos Prime
  const carlos = await prisma.user.create({
    data: {
      name: 'Carlos Eduardo Prime',
      email: 'carlos@imoveis.com',
      password: defaultPasswordHash,
      role: 'CORRETOR',
      status: 'ACTIVE',
      creci: 'CRECI 11420-F PB',
      agencyName: 'HelpUS Partner RealEstate',
      phone: '(83) 98765-4321',
      whatsapp: '5583987654321',
      bio: 'Consultor imobiliário credenciado no ecossistema HelpUS.',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      coverUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    },
  });

  // 5. Create Client / Buyer User
  const cliente = await prisma.user.create({
    data: {
      name: 'Lucas Silva (Comprador)',
      email: 'cliente@imoveis.com',
      password: defaultPasswordHash,
      role: 'CLIENT',
      status: 'ACTIVE',
      phone: '(83) 99111-2233',
      whatsapp: '5583991112233',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    },
  });

  console.log('👤 Users created successfully.');

  // 6. Seed Properties (including Dany Lima\'s Instagram listings)
  const propertiesData = [
    // --- Dany Lima Properties ---
    {
      title: 'Seu Refúgio em João Pessoa - Flat no Jardim Oceania a 150m da Praia',
      slug: 'flat-refugio-jardim-oceania-dany',
      description: 'Excelente oportunidade para morar ou investir no Jardim Oceania. Flat moderno com 1 quarto, banheiro social, cozinha integrada, vaga de garagem e piscina na área de lazer do edifício. Localização espetacular a apenas 150 metros da praia.',
      price: 385000,
      rentPrice: 2500,
      transactionType: 'SALE',
      propertyType: 'APARTMENT',
      address: 'Av. Fernando Luiz Henrique dos Santos, 1720',
      neighborhood: 'Jardim Oceania',
      city: 'João Pessoa',
      state: 'PB',
      zipCode: '58037-050',
      latitude: -7.0912,
      longitude: -34.8290,
      bedrooms: 1,
      bathrooms: 1,
      suites: 1,
      parkingSpaces: 1,
      areaTotal: 38,
      areaBuilt: 38,
      condoFee: 350,
      iptuFee: 650,
      featured: true,
      status: 'AVAILABLE',
      viewsCount: 420,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      ]),
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      virtualTourUrl: null,
      amenities: JSON.stringify(['A 150m do Mar', 'Piscina', 'Elevador', 'Portaria 24h', 'Vaga Coberta', 'Mobiliado']),
      realtorId: dany.id,
    },
    {
      title: 'Apartamento 3 Quartos com Suíte e Varanda no Coração do Bessa',
      slug: 'apartamento-3-quartos-bessa-dany',
      description: 'Lindo apartamento no 1º andar com 73m² de área privativa no Bessa. Composto por 3 quartos confortáveis (sendo 1 suíte), sala ampla em L com varanda, cozinha espaçosa com gás encanado e vaga de garagem privativa.',
      price: 400000,
      rentPrice: null,
      transactionType: 'SALE',
      propertyType: 'APARTMENT',
      address: 'Rua Afonso Campos, 420',
      neighborhood: 'Bessa',
      city: 'João Pessoa',
      state: 'PB',
      zipCode: '58035-110',
      latitude: -7.0750,
      longitude: -34.8350,
      bedrooms: 3,
      bathrooms: 2,
      suites: 1,
      parkingSpaces: 1,
      areaTotal: 73,
      areaBuilt: 73,
      condoFee: 420,
      iptuFee: 850,
      featured: true,
      status: 'AVAILABLE',
      viewsCount: 310,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      ]),
      videoUrl: null,
      virtualTourUrl: null,
      amenities: JSON.stringify(['1º Andar', 'Varanda', 'Gás Encanado', 'Vaga de Garagem', 'Interfone']),
      realtorId: dany.id,
    },
    {
      title: 'Pé na Areia 2 Suítes no Jardim Oceania com Piscina 360° na Cobertura',
      slug: 'pe-na-areia-jardim-oceania-dany',
      description: 'Vivencie o privilégio de morar literalmente com o pé na areia! Apartamento de 59m² com 2 suítes master, sala integrada com vista para a praia do Jardim Oceania e lazer rooftop panorâmico.',
      price: 1100000,
      rentPrice: null,
      transactionType: 'SALE',
      propertyType: 'APARTMENT',
      address: 'Av. Argemiro de Figueiredo, 2100',
      neighborhood: 'Jardim Oceania',
      city: 'João Pessoa',
      state: 'PB',
      zipCode: '58037-030',
      latitude: -7.0850,
      longitude: -34.8270,
      bedrooms: 2,
      bathrooms: 3,
      suites: 2,
      parkingSpaces: 2,
      areaTotal: 59,
      areaBuilt: 59,
      condoFee: 780,
      iptuFee: 1400,
      featured: true,
      status: 'AVAILABLE',
      viewsCount: 540,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      ]),
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      virtualTourUrl: null,
      amenities: JSON.stringify(['Pé na Areia', 'Piscina Rooftop 360', '2 Suítes', 'Vista Panorâmica do Mar', 'Espaço Gourmet']),
      realtorId: dany.id,
    },
    {
      title: 'Mobiliado a 50m da Praia do Bessa com Piscina',
      slug: 'mobiliado-50m-mar-bessa-dany',
      description: 'Pronto para morar ou rentabilizar no Airbnb! Apartamento de 55m² 100% mobiliado a apenas 50 metros da praia do Bessa. Edifício com estrutura de lazer completa e segurança.',
      price: 430000,
      rentPrice: 3200,
      transactionType: 'BOTH',
      propertyType: 'APARTMENT',
      address: 'Rua Miramar, 180',
      neighborhood: 'Bessa',
      city: 'João Pessoa',
      state: 'PB',
      zipCode: '58035-220',
      latitude: -7.0680,
      longitude: -34.8360,
      bedrooms: 2,
      bathrooms: 2,
      suites: 1,
      parkingSpaces: 1,
      areaTotal: 55,
      areaBuilt: 55,
      condoFee: 390,
      iptuFee: 720,
      featured: false,
      status: 'AVAILABLE',
      viewsCount: 290,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      ]),
      videoUrl: null,
      virtualTourUrl: null,
      amenities: JSON.stringify(['50m da Praia', '100% Mobiliado', 'Piscina', 'Espaço Gourmet', 'Ideal para Airbnb']),
      realtorId: dany.id,
    },
    {
      title: 'Oportunidade Baixou de Preço! Apartamento no Bessa',
      slug: 'oportunidade-baixou-preco-bessa-dany',
      description: 'Super oportunidade para fechar negócio rápido no Bessa! Imóvel com preço reduzido de R$ 355 mil por R$ 335 mil. Ótima localização em rua asfaltada e bem ventilado.',
      price: 335000,
      rentPrice: null,
      transactionType: 'SALE',
      propertyType: 'APARTMENT',
      address: 'Rua Golfe Clube, 310',
      neighborhood: 'Bessa',
      city: 'João Pessoa',
      state: 'PB',
      zipCode: '58035-150',
      latitude: -7.0720,
      longitude: -34.8370,
      bedrooms: 2,
      bathrooms: 1,
      suites: 0,
      parkingSpaces: 1,
      areaTotal: 52,
      areaBuilt: 52,
      condoFee: 310,
      iptuFee: 580,
      featured: false,
      status: 'AVAILABLE',
      viewsCount: 195,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      ]),
      videoUrl: null,
      virtualTourUrl: null,
      amenities: JSON.stringify(['Preço Reduzido', 'Excelente Localização', 'Vaga Garagem', 'Gás Individual']),
      realtorId: dany.id,
    },
    {
      title: 'Holanda Gold Hotel & Flat - 1º Hotel 5 Estrelas Beira-Mar do Bessa',
      slug: 'holanda-gold-hotel-flat-bessa-dany',
      description: 'Oportunidade única de investir no Holanda Gold Hotel, o primeiro hotel 5 estrelas em frente à praia em João Pessoa. Flat luxuoso de 42m² com piscina infantil e adulto em frente ao mar.',
      price: 590000,
      rentPrice: null,
      transactionType: 'SALE',
      propertyType: 'APARTMENT',
      address: 'Av. Governador Argemiro de Figueiredo, 3400',
      neighborhood: 'Bessa',
      city: 'João Pessoa',
      state: 'PB',
      zipCode: '58035-000',
      latitude: -7.0650,
      longitude: -34.8330,
      bedrooms: 1,
      bathrooms: 1,
      suites: 1,
      parkingSpaces: 1,
      areaTotal: 42,
      areaBuilt: 42,
      condoFee: 650,
      iptuFee: 1100,
      featured: true,
      status: 'AVAILABLE',
      viewsCount: 610,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      ]),
      videoUrl: null,
      virtualTourUrl: null,
      amenities: JSON.stringify(['Hotel 5 Estrelas', 'Frente ao Mar', 'Pool Hoteleiro', 'Piscina com Deck', 'Restaurante Exclusivo']),
      realtorId: dany.id,
    },

    // --- Other Featured Properties ---
    {
      title: 'Mansão Beira-Mar Cabo Branco com Piscina Infinita',
      slug: 'mansao-beira-mar-cabo-branco',
      description: 'Espetacular residência em localização privileged na beira-mar de Cabo Branco. Projeto arquitetônico assinado com acabamentos importados em mármore italiano, automação residencial completa, conceito aberto com vista panorâmica para o oceano, piscina com borda infinita, espaço gourmet integrado e suíte máster de 90m².',
      price: 4850000,
      rentPrice: 28000,
      transactionType: 'BOTH',
      propertyType: 'HOUSE',
      address: 'Av. Cabo Branco, 2400',
      neighborhood: 'Cabo Branco',
      city: 'João Pessoa',
      state: 'PB',
      zipCode: '58045-010',
      latitude: -7.1264,
      longitude: -34.8219,
      bedrooms: 5,
      bathrooms: 6,
      suites: 5,
      parkingSpaces: 4,
      areaTotal: 580,
      areaBuilt: 520,
      condoFee: 1800,
      iptuFee: 4200,
      featured: true,
      status: 'AVAILABLE',
      viewsCount: 342,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      ]),
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      virtualTourUrl: null,
      amenities: JSON.stringify(['Vista para o Mar', 'Piscina com Borda Infinita', 'Varanda Gourmet', 'Automação Residencial', 'Portaria 24h']),
      realtorId: waleska.id,
    },
    {
      title: 'Cobertura Duplex Penthouse no Altiplano',
      slug: 'cobertura-duplex-penthouse-altiplano',
      description: 'Cobertura exclusiva no andar mais alto do Altiplano Nobre. Terraço privativo com jacuzzi aquecida, espaço gourmet com churrasqueira a gás, sala com pé-direito duplo e vista livre 360°.',
      price: 3200000,
      rentPrice: null,
      transactionType: 'SALE',
      propertyType: 'PENTHOUSE',
      address: 'R. Poeta Luiz Raimundo Baptista de Carvalho',
      neighborhood: 'Altiplano',
      city: 'João Pessoa',
      state: 'PB',
      zipCode: '58046-000',
      latitude: -7.1415,
      longitude: -34.8188,
      bedrooms: 4,
      bathrooms: 5,
      suites: 4,
      parkingSpaces: 4,
      areaTotal: 410,
      areaBuilt: 390,
      condoFee: 2100,
      iptuFee: 3100,
      featured: true,
      status: 'AVAILABLE',
      viewsCount: 219,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      ]),
      videoUrl: null,
      virtualTourUrl: null,
      amenities: JSON.stringify(['Jacuzzi Privativa', 'Espaço Gourmet', 'Pé Direito Duplo', 'Vista 360 Graus']),
      realtorId: waleska.id,
    },
    {
      title: 'Casa Contemporânea em Condomínio Fechado Alphaville',
      slug: 'casa-contemporanea-alphaville',
      description: 'Residência moderna com linhas retas e paisagismo exuberante. Ampla sala de estar com integração para área de lazer privativa, churrasqueira, deck molhado e energia solar.',
      price: 2750000,
      rentPrice: null,
      transactionType: 'SALE',
      propertyType: 'HOUSE',
      address: 'Condomínio Alphaville, Quadra C',
      neighborhood: 'Bessa',
      city: 'João Pessoa',
      state: 'PB',
      zipCode: '58035-200',
      latitude: -7.0789,
      longitude: -34.8344,
      bedrooms: 4,
      bathrooms: 5,
      suites: 4,
      parkingSpaces: 3,
      areaTotal: 450,
      areaBuilt: 380,
      condoFee: 1200,
      iptuFee: 2400,
      featured: false,
      status: 'AVAILABLE',
      viewsCount: 140,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      ]),
      videoUrl: null,
      virtualTourUrl: null,
      amenities: JSON.stringify(['Condomínio Fechado', 'Energia Solar', 'Piscina Privativa', 'Segurança 24h']),
      realtorId: carlos.id,
    },
  ];

  for (const prop of propertiesData) {
    await prisma.property.create({ data: prop });
  }

  console.log('🏡 Properties with coordinates created successfully.');

  // Create sample lead for Dany
  const firstDanyProperty = await prisma.property.findFirst({ where: { slug: 'flat-refugio-jardim-oceania-dany' } });
  if (firstDanyProperty) {
    await prisma.leadInquiry.create({
      data: {
        propertyId: firstDanyProperty.id,
        realtorId: dany.id,
        clientName: 'Mariana Medeiros',
        clientEmail: 'mariana@email.com',
        clientPhone: '(83) 99888-4455',
        message: 'Olá Dany! Vi seu anúncio no Instagram danyimoveisjp. Gostaria de maiores informações sobre este flat no Jardim Oceania.',
        status: 'NEW',
      },
    });

    await prisma.favorite.create({
      data: {
        userId: cliente.id,
        propertyId: firstDanyProperty.id,
      },
    });
  }

  console.log('🎉 Database seeding with coordinates completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during database seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
