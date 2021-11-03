<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211025142710 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE service_sejour DROP FOREIGN KEY FK_A832251E84CF0CF');
        $this->addSql('ALTER TABLE infirmier DROP FOREIGN KEY FK_BFEC55B9ED5CA9E6');
        $this->addSql('ALTER TABLE service_sejour DROP FOREIGN KEY FK_A832251EED5CA9E6');
        $this->addSql('DROP TABLE sejour');
        $this->addSql('DROP TABLE service');
        $this->addSql('DROP TABLE service_sejour');
        $this->addSql('DROP INDEX IDX_BFEC55B9ED5CA9E6 ON infirmier');
        $this->addSql('ALTER TABLE infirmier DROP service_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE sejour (id INT AUTO_INCREMENT NOT NULL, patient_id INT DEFAULT NULL, lit_id INT NOT NULL, date_entree DATETIME NOT NULL, date_sortie DATETIME NOT NULL, INDEX IDX_96F520286B899279 (patient_id), INDEX IDX_96F52028278B5057 (lit_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE service (id INT AUTO_INCREMENT NOT NULL, date_entree DATETIME NOT NULL, date_sortie DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE service_sejour (service_id INT NOT NULL, sejour_id INT NOT NULL, INDEX IDX_A832251E84CF0CF (sejour_id), INDEX IDX_A832251EED5CA9E6 (service_id), PRIMARY KEY(service_id, sejour_id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE sejour ADD CONSTRAINT FK_96F52028278B5057 FOREIGN KEY (lit_id) REFERENCES lit (id)');
        $this->addSql('ALTER TABLE sejour ADD CONSTRAINT FK_96F520286B899279 FOREIGN KEY (patient_id) REFERENCES patient (id)');
        $this->addSql('ALTER TABLE service_sejour ADD CONSTRAINT FK_A832251E84CF0CF FOREIGN KEY (sejour_id) REFERENCES sejour (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE service_sejour ADD CONSTRAINT FK_A832251EED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE infirmier ADD service_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE infirmier ADD CONSTRAINT FK_BFEC55B9ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id)');
        $this->addSql('CREATE INDEX IDX_BFEC55B9ED5CA9E6 ON infirmier (service_id)');
    }
}
