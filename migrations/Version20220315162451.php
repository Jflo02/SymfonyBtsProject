<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220315162451 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE vaccin (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE vaccin_type (id INT AUTO_INCREMENT NOT NULL, vaccin_id INT DEFAULT NULL, nom VARCHAR(255) NOT NULL, stock INT NOT NULL, INDEX IDX_43B6EB189B14AC76 (vaccin_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE vaccination (id INT AUTO_INCREMENT NOT NULL, vaccin_id INT NOT NULL, date_vaccination DATETIME NOT NULL, UNIQUE INDEX UNIQ_1B0999999B14AC76 (vaccin_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE vaccin_type ADD CONSTRAINT FK_43B6EB189B14AC76 FOREIGN KEY (vaccin_id) REFERENCES vaccin (id)');
        $this->addSql('ALTER TABLE vaccination ADD CONSTRAINT FK_1B0999999B14AC76 FOREIGN KEY (vaccin_id) REFERENCES vaccin (id)');
        $this->addSql('ALTER TABLE infirmier ADD vaccination_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE infirmier ADD CONSTRAINT FK_BFEC55B94DDCCFA3 FOREIGN KEY (vaccination_id) REFERENCES vaccination (id)');
        $this->addSql('CREATE INDEX IDX_BFEC55B94DDCCFA3 ON infirmier (vaccination_id)');
        $this->addSql('ALTER TABLE patient ADD vaccination_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE patient ADD CONSTRAINT FK_1ADAD7EB4DDCCFA3 FOREIGN KEY (vaccination_id) REFERENCES vaccination (id)');
        $this->addSql('CREATE INDEX IDX_1ADAD7EB4DDCCFA3 ON patient (vaccination_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE vaccin_type DROP FOREIGN KEY FK_43B6EB189B14AC76');
        $this->addSql('ALTER TABLE vaccination DROP FOREIGN KEY FK_1B0999999B14AC76');
        $this->addSql('ALTER TABLE infirmier DROP FOREIGN KEY FK_BFEC55B94DDCCFA3');
        $this->addSql('ALTER TABLE patient DROP FOREIGN KEY FK_1ADAD7EB4DDCCFA3');
        $this->addSql('DROP TABLE vaccin');
        $this->addSql('DROP TABLE vaccin_type');
        $this->addSql('DROP TABLE vaccination');
        $this->addSql('DROP INDEX IDX_BFEC55B94DDCCFA3 ON infirmier');
        $this->addSql('ALTER TABLE infirmier DROP vaccination_id');
        $this->addSql('DROP INDEX IDX_1ADAD7EB4DDCCFA3 ON patient');
        $this->addSql('ALTER TABLE patient DROP vaccination_id');
    }
}
