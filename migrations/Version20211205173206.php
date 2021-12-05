<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211205173206 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649F4883BA4');
        $this->addSql('DROP INDEX UNIQ_8D93D649F4883BA4 ON user');
        $this->addSql('ALTER TABLE user CHANGE administratif_id_id administratif_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D6491B32DC44 FOREIGN KEY (administratif_id) REFERENCES administratif (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D6491B32DC44 ON user (administratif_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6491B32DC44');
        $this->addSql('DROP INDEX UNIQ_8D93D6491B32DC44 ON user');
        $this->addSql('ALTER TABLE user CHANGE administratif_id administratif_id_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649F4883BA4 FOREIGN KEY (administratif_id_id) REFERENCES administratif (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649F4883BA4 ON user (administratif_id_id)');
    }
}
