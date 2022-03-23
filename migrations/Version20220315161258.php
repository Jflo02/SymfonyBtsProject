<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220315161258 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE vaccin_type DROP FOREIGN KEY FK_43B6EB182E55F6D1');
        $this->addSql('ALTER TABLE vaccination DROP FOREIGN KEY FK_1B0999992E55F6D1');
        $this->addSql('DROP TABLE vaccin');
        $this->addSql('DROP TABLE vaccin_type');
        $this->addSql('DROP TABLE vaccination');
        $this->addSql('ALTER TABLE infirmier DROP vaccination_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE vaccin (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE vaccin_type (id INT AUTO_INCREMENT NOT NULL, vaccin_id_id INT NOT NULL, nom VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, stock INT NOT NULL, INDEX IDX_43B6EB182E55F6D1 (vaccin_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE vaccination (id INT AUTO_INCREMENT NOT NULL, vaccin_id_id INT NOT NULL, date_vaccination DATETIME NOT NULL, UNIQUE INDEX UNIQ_1B0999992E55F6D1 (vaccin_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE vaccin_type ADD CONSTRAINT FK_43B6EB182E55F6D1 FOREIGN KEY (vaccin_id_id) REFERENCES vaccin (id)');
        $this->addSql('ALTER TABLE vaccination ADD CONSTRAINT FK_1B0999992E55F6D1 FOREIGN KEY (vaccin_id_id) REFERENCES vaccin (id)');
        $this->addSql('ALTER TABLE infirmier ADD vaccination_id INT NOT NULL');
    }
}
