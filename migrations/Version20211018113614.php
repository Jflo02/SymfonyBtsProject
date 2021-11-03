<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211018113614 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE chambre (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE infirmier (id INT AUTO_INCREMENT NOT NULL, service_id INT DEFAULT NULL, prenom VARCHAR(255) NOT NULL, nom VARCHAR(255) NOT NULL, age INT NOT NULL, mot_de_passe VARCHAR(255) NOT NULL, INDEX IDX_BFEC55B9ED5CA9E6 (service_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE lit (id INT AUTO_INCREMENT NOT NULL, chambre_id INT NOT NULL, INDEX IDX_5DDB8E9D9B177F54 (chambre_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE patient (id INT AUTO_INCREMENT NOT NULL, prenom VARCHAR(255) NOT NULL, nom VARCHAR(255) NOT NULL, age INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sejour (id INT AUTO_INCREMENT NOT NULL, patient_id INT DEFAULT NULL, lit_id INT NOT NULL, date_entree DATETIME NOT NULL, date_sortie DATETIME NOT NULL, INDEX IDX_96F520286B899279 (patient_id), INDEX IDX_96F52028278B5057 (lit_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE service (id INT AUTO_INCREMENT NOT NULL, date_entree DATETIME NOT NULL, date_sortie DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE service_sejour (service_id INT NOT NULL, sejour_id INT NOT NULL, INDEX IDX_A832251EED5CA9E6 (service_id), INDEX IDX_A832251E84CF0CF (sejour_id), PRIMARY KEY(service_id, sejour_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE infirmier ADD CONSTRAINT FK_BFEC55B9ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id)');
        $this->addSql('ALTER TABLE lit ADD CONSTRAINT FK_5DDB8E9D9B177F54 FOREIGN KEY (chambre_id) REFERENCES chambre (id)');
        $this->addSql('ALTER TABLE sejour ADD CONSTRAINT FK_96F520286B899279 FOREIGN KEY (patient_id) REFERENCES patient (id)');
        $this->addSql('ALTER TABLE sejour ADD CONSTRAINT FK_96F52028278B5057 FOREIGN KEY (lit_id) REFERENCES lit (id)');
        $this->addSql('ALTER TABLE service_sejour ADD CONSTRAINT FK_A832251EED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE service_sejour ADD CONSTRAINT FK_A832251E84CF0CF FOREIGN KEY (sejour_id) REFERENCES sejour (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE lit DROP FOREIGN KEY FK_5DDB8E9D9B177F54');
        $this->addSql('ALTER TABLE sejour DROP FOREIGN KEY FK_96F52028278B5057');
        $this->addSql('ALTER TABLE sejour DROP FOREIGN KEY FK_96F520286B899279');
        $this->addSql('ALTER TABLE service_sejour DROP FOREIGN KEY FK_A832251E84CF0CF');
        $this->addSql('ALTER TABLE infirmier DROP FOREIGN KEY FK_BFEC55B9ED5CA9E6');
        $this->addSql('ALTER TABLE service_sejour DROP FOREIGN KEY FK_A832251EED5CA9E6');
        $this->addSql('DROP TABLE chambre');
        $this->addSql('DROP TABLE infirmier');
        $this->addSql('DROP TABLE lit');
        $this->addSql('DROP TABLE patient');
        $this->addSql('DROP TABLE sejour');
        $this->addSql('DROP TABLE service');
        $this->addSql('DROP TABLE service_sejour');
    }
}
